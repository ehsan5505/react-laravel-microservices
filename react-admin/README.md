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
<Router path="" exact components="{<Name>}"/>
</BrowserRouter>