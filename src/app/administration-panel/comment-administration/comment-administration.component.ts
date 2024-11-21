import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from './comment';
import { CommentService } from './comment.service';
import { filter, fromEvent, map, Subscription, throttleTime } from 'rxjs';

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

  discardReport(commentId: string){
    this.handleReports(commentId);

  }

  deleteComment(commentId: string){
    this.handleReports(commentId);
  }

  banUser(commentId: string){
    this.handleReports(commentId);
  }

  handleReports(commentId: string){
    this.comments = this.comments.filter(com => com.id !== commentId);
    if(this.comments.length < 10){
      this.loadComments();
    }  
  }
}
