import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PostService } from './post.service'
import { Post } from './post';
import { filter, fromEvent, map, Observable, Subscription, catchError, throttleTime,switchMap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BanUserService } from '../ban-user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-administration',
  standalone: true,
  imports: [],
  templateUrl: './post-administration.component.html',
  styleUrl: './post-administration.component.css'
})
export class PostAdministrationComponent {
   httpClient = inject(HttpClient);

  @ViewChild('postsScroll') postsScroll!: ElementRef;
  
  private postService = inject(PostService);
  private snackBar = inject(MatSnackBar);
  private banUserService = inject(BanUserService);
  private scrollSubscription!: Subscription;

  posts: Post[] = [];
  isLoading = false;
  postsPageNo: number = 0;

  ngOnInit(){
    this.loadPosts();
  }

  loadPosts(){
    /*
    var refreshUrl = 'http://localhost:8080' + '/authentication/noAuth/refreshToken';
  var isRefreshing = false;

  if (!isRefreshing) {

    isRefreshing = true;

     this.httpClient.get(refreshUrl, { withCredentials: true }).subscribe({
      next: (r) =>{
        console.log('gfsd');
      }
     })
    
  } 
     */

    this.isLoading = true;

    this.postService.getPosts(this.postsPageNo).subscribe({
      next: (newposts) => {
        this.posts =[...this.posts, ...newposts.content];
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

        }
      },
      error: (error) => {
        this.openSnackBar('Error, please try again later');
        console.log(error);
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
        this.openSnackBar('Error, please try again later');
        console.log(error);
      },
    });
  }

  banUser(postId: string, posterUsername: string){
    this.deletePost(postId);

    this.banUserService.banUser(posterUsername).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.refreshListOfReports(postId);
          this.openSnackBar('User banned');
        }
      },
      error: (error) => {
        this.openSnackBar('Error, please try again later');
        console.log(error);
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
