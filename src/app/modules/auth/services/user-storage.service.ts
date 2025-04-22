import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const USER = 'q_user';

@Injectable({
    providedIn: 'root'
})
export class UserStorageService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    static saveUser(user: any): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(USER);
            window.localStorage.setItem(USER, JSON.stringify(user));
        }
    }

    static getUser(): any {
        if (typeof window !== 'undefined' && window.localStorage) {
            const user = localStorage.getItem(USER);
            return user ? JSON.parse(user) : null;
        }
        return null;
    }

    static getUserId(): string {
        const user = this.getUser();
        if (user == null) { return ''; }
        return user.id;
    }

    static getUserRole(): string {
        const user = this.getUser();
        if (user == null) { return ''; }
        return user.role;
    }

    static isAdminLoggedIn(): boolean {
        const role: string = this.getUserRole();
        return role == 'ADMIN';
    }

    static isUserLoggedIn(): boolean {
        const role: string = this.getUserRole();
        return role == 'USER';
    }

    static signOut(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(USER);
        }
    }
}