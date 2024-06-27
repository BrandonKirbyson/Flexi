import type {Name} from './Util';

export interface Student {
    email: string;
    name: Name;
    year: number;
    classes: string[];
    favoriteClasses: string[];
}

// The current student who is using the app
export interface CurrentStudent extends Student {
    profile: string;
    id: string;
    // flex: FlexClass[];
}
