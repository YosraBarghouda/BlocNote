import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  email: string = '';
  password: string = '';
  newPassword :string ='';
  bio: string = '';
  previewImage: string | null = null;
  selectedImage: File | null = null;
  nb_notes: number = 0;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.profileService.getProfile(userId).subscribe({
        next: (profile) => {
          this.email = profile.email;
          this.password = profile.password;
          this.bio = profile.bio;
          this.previewImage = "data:image/jpeg;base64," + profile.picture;
          this.nb_notes = profile.nb_notes;
        },
        error: (err) => {
          console.error('Error loading profile:', err);
        },
      });
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedImage = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  onSave() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User  not logged in!');
      return;
    }

    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.newPassword);
    formData.append('bio', this.bio);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.profileService.updateProfile(userId, formData).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.loadUserProfile();
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      },
    });
  }
}