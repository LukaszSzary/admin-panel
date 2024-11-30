import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from './comment';
import { CommentService } from './comment.service';
import { filter, fromEvent, map, Observable, Subscription, throttleTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../login/login.service';

type commentFunctionDelegate = (postId: string, commentId: string) =>  Observable<any>;

@Component({
  selector: 'app-comment-administration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-administration.component.html',
  styleUrl: './comment-administration.component.css',
})
export class CommentAdministrationComponent {
  @ViewChild('commentsScroll') commentsScroll!: ElementRef;
  
  private commentService = inject(CommentService);
  private snackBar = inject(MatSnackBar);
  private loginService = inject(LoginService);

  private scrollSubscription!: Subscription;

  comments: Comment[] = [];
  isLoading = false;
  commentsPageNo: number = 1;

  ngOnInit(){
    this.loadComments();
  }

  loadComments(){
    this.isLoading = true;

    this.commentService.getComments(this.commentsPageNo).subscribe({
      next: (newComments) => {
        this.comments =[...this.comments, ...newComments];
        this.isLoading = false;
        this.commentsPageNo++;
      },
      error:(error)=> {
        console.error('Error fetching comments', error);
        this.isLoading = false;
      },
    });
  }

  ngAfterViewInit() {
    // Setup scroll event listener with throttling
    this.scrollSubscription = fromEvent(this.commentsScroll.nativeElement, 'scroll')
      .pipe(
        throttleTime(50),
        map(() => this.checkScrollPosition()),
        filter(isBottom => isBottom && !this.isLoading)
      )
      .subscribe(() => this.loadComments());
  }

  checkScrollPosition(): boolean {
    const container = this.commentsScroll.nativeElement;
    const threshold = 200; // Trigger 200px before the bottom
    return container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
  }

  discardReport(postId: string, commentId: string){
    
    this.commentService.discardReport(commentId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.refreshListOfReports(commentId);
          this.openSnackBar('Report discarded');
        }
      },
      error: (error) => {
        if (error.status == 403){
          this.refreshToken(postId, commentId, this.commentService.discardReport);
        }
      },
    });
  }

  deleteComment(postId: string, commentId: string){
    
    this.commentService.deleteComment(postId, commentId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.refreshListOfReports(commentId);
          this.openSnackBar('Comment deleted');
        }
      },
      error: (error) => {
        if (error.status == 403){
          this.refreshToken(postId, commentId, this.commentService.deleteComment);
        }
      },
    });
  }

  banUser(postId: string, commentId: string){
    this.deleteComment(postId, commentId);

    this.commentService.banUser(postId, commentId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.refreshListOfReports(commentId);
          this.openSnackBar('User banned');
        }
      },
      error: (error) => {
        if (error.status == 403){
          this.refreshToken(postId, commentId, this.commentService.banUser);
        }
      },
    });
  }

  refreshListOfReports(commentId: string){
    this.comments = this.comments.filter(com => com.id !== commentId);
    if(this.comments.length < 10){
      this.loadComments();
    }  
  }

  refreshToken(postId: string, commentId: string, funcToDoWhenRefreshed: commentFunctionDelegate){
    this.loginService.refreshToken().subscribe({
      next: (response) => {
        if (response.status == 200) {

          funcToDoWhenRefreshed(postId, commentId).subscribe({
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
