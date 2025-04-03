import * as React from 'react';

export interface ISidebarButton{
title:string,
icon:React.ReactElement,
name:string,
href:string
}
export interface IParentButton{
icon:React.ReactElement,
ariaControlsName:string,
children?:IParentButton[],
name:string,
title:string,
href?:string,
groupName?:string
}
