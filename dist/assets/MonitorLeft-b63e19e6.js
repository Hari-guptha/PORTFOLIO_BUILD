import{R as c,L as i,a as p,r as d,j as t,V as u}from"./index-042192e6.js";import{u as n}from"./Gltf-8322735a.js";function f(m){const{nodes:r,materials:o}=n("Models/monitor.glb"),a=c.useMemo(()=>{const e=document.createElement("video");return e.src="chemin.mp4",e.crossOrigin="Anonymous",e.loop=!0,e.muted=!0,e.generateMipmaps=!1,e.minFilter=i,e.magFilter=i,e.format=p,e},[]);d.useEffect(()=>{a.play()},[a]);const l=e=>{const s=new u(e);return s.flipY=!1,s};return t.jsxs("group",{...m,dispose:null,rotation:[0,.8,0],"position-y":-3,scale:15,children:[t.jsx("mesh",{geometry:r.Computer_Stand.geometry,material:o.Computer,position:[-.7,.008,-.126],rotation:[.007,0,0],children:t.jsx("meshStandardMaterial",{attach:"material",color:"black"})}),t.jsx("mesh",{geometry:r.Screen.geometry,material:o.Computer,position:[-.7,.293,-.182],rotation:[-.057,0,0],children:t.jsx("meshStandardMaterial",{attach:"material",color:"black"})}),t.jsx("mesh",{geometry:r.Screen001.geometry,material:o["Material.001"],position:[-.7,.293,-.179],rotation:[-.057,0,0],scale:[1,1.066,1],children:t.jsx("meshBasicMaterial",{toneMapped:!1,children:t.jsx("primitive",{attach:"map",object:l(a)})})})]})}n.preload("Models/monitor.glb");export{f as LeftMonitor};
