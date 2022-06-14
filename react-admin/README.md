# React Admin Portal

Create the Project
`npx create-react-app react-admin --template typescripts`

To create the components you can create a file with tsx extension the use the import
import React from 'react'

const <ComponentName> = () => ( <html>);
export default ComponentName;

To route the Componets, you can use the BrowserRoute and Route function, for this you need to install
`npm install react-router-dom @types/react-router-dom`

<BrowserRouter>
<Routes>
<Route path="" exact components="{<Name>}"/>
<Routes/>
</BrowserRouter>


You can define the Child Props that would enclosed the components inside and help in the navigation based on layout

*Wrapper Class to include the child compoents* 

interace InterfaceName 
{
  children: React.ReactNode
}
class <CompoName> extends Components<InterfaceName> {
  <>
  {this.props.children}
  </>
} 
In above we have to create an interface with children else it will return an error on compilation 
https://stackoverflow.com/questions/59106742/typescript-error-property-children-does-not-exist-on-type-reactnode

For Login Styles we refer to 
https://mdbootstrap.com/docs/standard/extended/login/#!

<!-- Toastr -->
npm i react-toastify