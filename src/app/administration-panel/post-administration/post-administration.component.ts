import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service'
import { Post } from './post';
import { filter, fromEvent, map, Subscription, throttleTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  discardReport(postId: string){
    this.handleReport(postId);
    this.postService.discardReport(postId).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.openSnackBar('Report discarded');
        }
      },
      error: (error) => {
        
      },
    });
  }

  deletePost(postId: string){
    this.handleReport(postId);
    this.postService.deletePost(postId).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.openSnackBar('Post deleted');
        }
      },
      error: (error) => {
        
      },
    });
  }

  banUser(postId: string){
    this.handleReport(postId);
    this.postService.banUser(postId).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.openSnackBar('User banned');
        }
      },
      error: (error) => {
        
      },
    });
  }

  handleReport(postId: string){
    this.posts = this.posts.filter(com => com.id !== postId);
    if(this.posts.length < 10){
      this.loadPosts();
    }  
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
