
export class GetCategories{
    static readonly type = '[SideNav] Get Categories';
    constructor(){}
}

export class UpdateActive{
    static readonly type = '[Sidenav] Set Active';
    constructor(public payload : string){}
}
export class SetLoading{
    static readonly type ='[SideNav] Set Loading';
    constructor(public payload : boolean){}
}