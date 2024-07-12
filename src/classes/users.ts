import{ IResponseUsers } from "../interfaces/IResponseUsers";
export class Users {
    public getUser = async (): Promise<IResponseUsers[]> => {
        const response = await fetch('http://localhost:3000/users');
        const data: IResponseUsers[] = await response.json();
        return data;
    };
    
}