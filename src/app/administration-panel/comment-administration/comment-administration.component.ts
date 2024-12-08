import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from './comment';
import { CommentService } from './comment.service';
import { filter, fromEvent, map, Subscription, throttleTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BanUserService } from '../ban-user.service';

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
  private banUserService = inject(BanUserService);
  private scrollSubscription!: Subscription;

  comments: Comment[] = [];
  isLoading = false;
  commentsPageNo: number = 0;

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.isLoading = true;

    this.commentService.getComments(this.commentsPageNo).subscribe({
      next: (newComments) => {
        this.comments = [...this.comments, ...newComments.objects.content];
        console.log(this.comments);
        this.isLoading = false;
        this.commentsPageNo++;
      },
      error: (error) => {
        console.error('Error fetching comments', error);
        this.isLoading = false;
      },
    });
  }

  ngAfterViewInit() {
    // Setup scroll event listener with throttling
    this.scrollSubscription = fromEvent(
      this.commentsScroll.nativeElement,
      'scroll'
    )
      .pipe(
        throttleTime(50),
        map(() => this.checkScrollPosition()),
        filter((isBottom) => isBottom && !this.isLoading)
      )
      .subscribe(() => this.loadComments());
  }

  checkScrollPosition(): boolean {
    const container = this.commentsScroll.nativeElement;
    const threshold = 200; // Trigger 200px before the bottom
    return (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - threshold
    );
  }

  discardReport(commentId: string) {
    this.commentService.discardReport(commentId).subscribe({
      next: (response) => {
        if (response.success) {
          this.refreshListOfReports(commentId);
          this.openSnackBar('Report discarded');
        }
      },
      error: (error) => {
        this.openSnackBar('Error, please try again later');
        console.log(error);
      },
    });
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.refreshListOfReports(commentId);
          this.openSnackBar('Comment deleted');
        }
      },
      error: (error) => {
        this.openSnackBar('Error, please try again later');
        console.log(error);
      },
    });
  }

  banUser(userName: string, commentId: string) {
    this.deleteComment(commentId);

    this.banUserService.banUser(userName).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.refreshListOfReports(commentId);
          this.openSnackBar('User banned');
        }
      },
      error: (error) => {
        this.openSnackBar('Error, please try again later');
        console.log(error);
      },
    });
  }

  refreshListOfReports(commentId: string) {
    this.comments = this.comments.filter((com) => com.id !== commentId);
    if (this.comments.length < 10) {
      this.loadComments();
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
