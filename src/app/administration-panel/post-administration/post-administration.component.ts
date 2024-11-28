import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service'

import { Post } from './post';
import { filter, fromEvent, map, Observable, Subscription, throttleTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../login/login.service';

type postFunctionDelegate = (id: string) =>  Observable<any>;

@Component({
  selector: 'app-post-administration',
  standalone: true,
  imports: [],
  templateUrl: './post-administration.component.html',
  styleUrl: './post-administration.component.css'
})
export class PostAdministrationComponent {
  

  @ViewChild('postsScroll') postsScroll!: ElementRef;
  
  private postService = inject(PostService);
  private loginService = inject(LoginService);
  private snackBar = inject(MatSnackBar);

  private scrollSubscription!: Subscription;

  posts: Post[] = [];
  imgSrc: string = '';
  isLoading = false;
  postsPageNo: number = 1;

  ngOnInit(){
    this.loadPosts();
  }

  loadPosts(){
    this.isLoading = true;

    this.postService.getPosts(this.postsPageNo).subscribe({
      next: (newposts) => {
        this.posts =[...this.posts, ...newposts];
        this.isLoading = false;
        this.postsPageNo++;
      },
      error:(error)=> {
        console.error('Error fetching posts', error);
        this.isLoading = false;
      },
    });
  }

  ngAfterViewInit() {
    // Setup scroll event listener with throttling
    this.scrollSubscription = fromEvent(this.postsScroll.nativeElement, 'scroll')
      .pipe(
        throttleTime(50),
        map(() => this.checkScrollPosition()),
        filter(isBottom => isBottom && !this.isLoading)
      )
      .subscribe(() => this.loadPosts());
  }

  checkScrollPosition(): boolean {
    const container = this.postsScroll.nativeElement;
    const threshold = 200; // Trigger 200px before the bottom
    return container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
  }

  refreshListOfReports(postId: string){
    this.posts = this.posts.filter(com => com.id !== postId);
    if(this.posts.length < 10){
      this.loadPosts();
    }  
  }

  discardReport(postId: string){
    
    this.postService.discardReport(postId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.refreshListOfReports(postId);
          this.openSnackBar('Report discarded');
          console.log(response);

        }
      },
      error: (error) => {
        if (error.status == 403){
          this.refreshToken(postId, this.postService.discardReport); 
        }
      },
    });
  }

  deletePost(postId: string){
    
    this.postService.deletePost(postId).subscribe({
      next: (response) => {

        if (response.status == 200) {
          this.refreshListOfReports(postId);
          this.openSnackBar('Post deleted');
        }

      },
      error: (error) => {
       // console.log(error);
      if (error.status == 403){
        this.refreshToken(postId, this.postService.deletePost); 
      }
      },
    });
  }

  banUser(postId: string){
    this.deletePost(postId);

    this.postService.banUser(postId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.refreshListOfReports(postId);
          this.openSnackBar('User banned');
        }
      },
      error: (error) => {
        if (error.status == 403){
          this.refreshToken(postId, this.postService.banUser); 
        }
      },
    });
  }

  refreshToken(id: string, funcToDoWhenRefreshed: postFunctionDelegate){
    this.loginService.refreshToken().subscribe({
      next: (response) => {
        if (response.status == 200) {

          funcToDoWhenRefreshed(id).subscribe({
            next: (response) => {
              if (response.status == 200) {
                this.openSnackBar('Action completed');
              }
            },
            error: (error) => {
              this.openSnackBar(error.statusText);
            }, 
          });
        }
      },
      error: (error) => {
        this.openSnackBar(error.statusText);
      },
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
