import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer.model';
// import { SecurityService } from 'src/app/security/security.service';
// import { HttpClient } from '@angular/common/http'
// import { Router } from '@angular/router';

// interface Order {
//   id: number;
//   date: string;
//   total: number;
//   status: string;
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // constructor(public secService: SecurityService, private http: HttpClient, private router: Router) {}

  // user = {
  //// userName: this.secService.profile ? this.secService.profile.userName : 'N/A',
  //   firstName: this.secService.profile ? this.secService.profile.firstName : 'N/A',
  //   lastName: this.secService.profile ? this.secService.profile.lastname : 'N/A',
  //   email: this.secService.profile ? this.secService.profile.email : 'N/A',
  // };

  user: Partial<Customer> = {
    firstname: 'Firstname',
    lastname: 'Secondname',
    email: 'user@example.com',
  };

  // orders: any[] = [];

  orders = [
    { id: 101, date: '2024-04-01', total: 2999, status: 'Доставлен' },
    { id: 102, date: '2024-04-12', total: 1499, status: 'В обработке' },
  ];

  ngOnInit(): void {
    // if (this.secService.profile) {
    //   this.user.name = this.secService.profile.userName || 'N/A';
    //   this.user.email = this.secService.profile.email || 'N/A';
    //   this.getOrders();
    // }
  }

  // getOrders(): void {
  //   const customerId = this.secService.profile?.id;
  //   if (!customerId) return;

  //   this.http
  //     .get<any[]>(`http://localhost:8081/api/orders/customer/${customerId}`)
  //     .subscribe(
  //       (orders) => {
  //         this.orders = orders;
  //         console.log('Orders fetched:', orders);
  //       },
  //       (error) => {
  //         console.error('Failed to fetch orders:', error);
  //         this.orders = [];
  //       }
  //     );
  // }

  isEditing = false;
  editName = '';
  editEmail = '';

  startEdit(): void {
    this.editName = (this.user.firstname + ' ' + this.user.lastname).trim();
    this.editEmail = this.user.email ?? '';
    this.isEditing = true;
  }

  saveEdit(): void {
    const names = this.editName.trim().split(/\s+/);
    this.user.firstname = names.shift() || '';
    this.user.lastname = names.join(' ') || '';
    this.user.email = this.editEmail.trim();
    this.isEditing = false;

    // const updateDto: any = {};
    // if (this.user.firstname) updateDto.firstname = this.user.firstname;
    // if (this.user.lastname) updateDto.lastname = this.user.lastname;
    // if (this.user.email) updateDto.email = this.user.email;

    // this.http
    //   .put(`http://localhost:8081/api/customers/${customerId}`, updateDto)
    //   .subscribe({
    //     next: () => console.log('User info successfully updated'),
    //     error: (err) => console.error('Update failed:', err),
    //   });

    console.log('User info updated:', this.user);
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  // deleteAccount(): void {
  //   const customerId = this.secService.profile?.id;
  //   if (!customerId) return;

  //// if (!confirm('Are you sure you want to delete your account ?')) return;

  //   this.http.delete(`http://localhost:8081/api/customers/${customerId}`).subscribe({
  //     next: () => {
  //       console.log('Account successfully deleted!');
  //       this.secService.logout();
  //       this.router.navigateByUrl('/home');
  //     },
  //     error: (err) => {
  //       console.error('Error deleting account:', err);
  //       alert('Error deleting account');
  //     }
  //   });
  // }
}
