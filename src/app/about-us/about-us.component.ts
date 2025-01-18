import { Component } from '@angular/core';
import { CommentsService } from '../services/comments.service'; // Importez le service

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  public companyName = 'typy_box';
  public missionStatement = 'To empower individuals to capture, organize, and share their thoughts effortlessly.';
  public teamMembers = [
    { name: 'John Doe', role: 'CEO', image: 'assets/john-doe.jpg' }, 
    { name: 'Jane Smith', role: 'CTO', image: 'assets/jane-smith.jpg' }, 
    { name: 'David Lee', role: 'Lead Developer', image: 'assets/david-lee.jpg' } 
  ];
  public values = [
    'Innovation',
    'Simplicity',
    'User -centricity',
    'Reliability',
    'Security'
  ];

  comment: string = '';

  constructor(private commentsService: CommentsService) {} // Injectez le service

  onSubmit(form: any): void {
    if (!this.comment.trim()) {
      alert("Error! Nothing was written ");
    } else {
      this.commentsService.addComment(this.comment).subscribe({
        next: () => {
          alert('Comment/Feedback sent successfully!');
          this.comment = ''; 
          form.resetForm(); 
        },
        error: (err) => {
          console.error('Error sending comment:', err);
          alert('Failed to send comment. Please try again.');
        }
      });
    }
  }
}