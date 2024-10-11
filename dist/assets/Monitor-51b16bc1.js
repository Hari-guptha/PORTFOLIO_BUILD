import{b as te,S as re,U as f,c as P,N as ae,W as H,L as B,H as Y,d as ie,C as oe,B as se,e as $,M as ne,f as le,r as a,g as ue,u as N,P as me,h as R,i as G,k as q,l as he,D as ce,m as fe,n as de,o as ve,_ as pe,R as xe,a as ge,p as _e,q as Se,T as Me,j as s,V as De}from"./index-34f8429f.js";import{u as K}from"./Gltf-c2d67875.js";const Te=()=>parseInt(te.replace(/\D+/g,"")),Be=Te();class ye extends re{constructor(e=new P){super({uniforms:{inputBuffer:new f(null),depthBuffer:new f(null),resolution:new f(new P),texelSize:new f(new P),halfTexelSize:new f(new P),kernel:new f(0),scale:new f(1),cameraNear:new f(0),cameraFar:new f(1),minDepthThreshold:new f(0),maxDepthThreshold:new f(1),depthScale:new f(0),depthToBlurRatioBias:new f(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${Be>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:ae,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class Ue{constructor({gl:e,resolution:t,width:i=500,height:h=500,minDepthThreshold:d=0,maxDepthThreshold:v=1,depthScale:p=0,depthToBlurRatioBias:x=.25}){this.renderToScreen=!1,this.renderTargetA=new H(t,t,{minFilter:B,magFilter:B,stencilBuffer:!1,depthBuffer:!1,type:Y}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new ye,this.convolutionMaterial.setTexelSize(1/i,1/h),this.convolutionMaterial.setResolution(new P(i,h)),this.scene=new ie,this.camera=new oe,this.convolutionMaterial.uniforms.minDepthThreshold.value=d,this.convolutionMaterial.uniforms.maxDepthThreshold.value=v,this.convolutionMaterial.uniforms.depthScale.value=p,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=x,this.convolutionMaterial.defines.USE_DEPTH=p>0;const o=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),g=new Float32Array([0,0,2,0,0,2]),r=new se;r.setAttribute("position",new $(o,3)),r.setAttribute("uv",new $(g,2)),this.screen=new ne(r,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,i){const h=this.scene,d=this.camera,v=this.renderTargetA,p=this.renderTargetB;let x=this.convolutionMaterial,o=x.uniforms;o.depthBuffer.value=t.depthTexture;const g=x.kernel;let r=t,_,D,k;for(D=0,k=g.length-1;D<k;++D)_=D&1?p:v,o.kernel.value=g[D],o.inputBuffer.value=r.texture,e.setRenderTarget(_),e.render(h,d),r=_;o.kernel.value=g[D],o.inputBuffer.value=r.texture,e.setRenderTarget(this.renderToScreen?null:i),e.render(h,d)}}let we=class extends le{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;(t=e.defines)!=null&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}};const Fe=a.forwardRef(({mixBlur:M=0,mixStrength:e=1,resolution:t=256,blur:i=[0,0],minDepthThreshold:h=.9,maxDepthThreshold:d=1,depthScale:v=0,depthToBlurRatioBias:p=.25,mirror:x=0,distortion:o=1,mixContrast:g=1,distortionMap:r,reflectorOffset:_=0,...D},k)=>{ue({MeshReflectorMaterialImpl:we});const l=N(({gl:m})=>m),b=N(({camera:m})=>m),X=N(({scene:m})=>m);i=Array.isArray(i)?i:[i,i];const A=i[0]+i[1]>0,U=a.useRef(null);a.useImperativeHandle(k,()=>U.current,[]);const[w]=a.useState(()=>new me),[T]=a.useState(()=>new R),[y]=a.useState(()=>new R),[W]=a.useState(()=>new R),[C]=a.useState(()=>new G),[I]=a.useState(()=>new R(0,0,-1)),[S]=a.useState(()=>new q),[j]=a.useState(()=>new R),[z]=a.useState(()=>new R),[E]=a.useState(()=>new q),[F]=a.useState(()=>new G),[c]=a.useState(()=>new he),J=a.useCallback(()=>{var m;const n=U.current.parent||((m=U.current)==null?void 0:m.__r3f.parent);if(!n||(y.setFromMatrixPosition(n.matrixWorld),W.setFromMatrixPosition(b.matrixWorld),C.extractRotation(n.matrixWorld),T.set(0,0,1),T.applyMatrix4(C),y.addScaledVector(T,_),j.subVectors(y,W),j.dot(T)>0))return;j.reflect(T).negate(),j.add(y),C.extractRotation(b.matrixWorld),I.set(0,0,-1),I.applyMatrix4(C),I.add(W),z.subVectors(y,I),z.reflect(T).negate(),z.add(y),c.position.copy(j),c.up.set(0,1,0),c.up.applyMatrix4(C),c.up.reflect(T),c.lookAt(z),c.far=b.far,c.updateMatrixWorld(),c.projectionMatrix.copy(b.projectionMatrix),F.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),F.multiply(c.projectionMatrix),F.multiply(c.matrixWorldInverse),F.multiply(n.matrixWorld),w.setFromNormalAndCoplanarPoint(T,y),w.applyMatrix4(c.matrixWorldInverse),S.set(w.normal.x,w.normal.y,w.normal.z,w.constant);const u=c.projectionMatrix;E.x=(Math.sign(S.x)+u.elements[8])/u.elements[0],E.y=(Math.sign(S.y)+u.elements[9])/u.elements[5],E.z=-1,E.w=(1+u.elements[10])/u.elements[14],S.multiplyScalar(2/S.dot(E)),u.elements[2]=S.x,u.elements[6]=S.y,u.elements[10]=S.z+1,u.elements[14]=S.w},[b,_]),[O,Q,Z,V]=a.useMemo(()=>{const m={minFilter:B,magFilter:B,type:Y},n=new H(t,t,m);n.depthBuffer=!0,n.depthTexture=new ce(t,t),n.depthTexture.format=fe,n.depthTexture.type=de;const u=new H(t,t,m),L=new Ue({gl:l,resolution:t,width:i[0],height:i[1],minDepthThreshold:h,maxDepthThreshold:d,depthScale:v,depthToBlurRatioBias:p}),ee={mirror:x,textureMatrix:F,mixBlur:M,tDiffuse:n.texture,tDepth:n.depthTexture,tDiffuseBlur:u.texture,hasBlur:A,mixStrength:e,minDepthThreshold:h,maxDepthThreshold:d,depthScale:v,depthToBlurRatioBias:p,distortion:o,distortionMap:r,mixContrast:g,"defines-USE_BLUR":A?"":void 0,"defines-USE_DEPTH":v>0?"":void 0,"defines-USE_DISTORTION":r?"":void 0};return[n,u,L,ee]},[l,i,F,t,x,A,M,e,h,d,v,p,o,r,g]);return ve(()=>{var m;const n=U.current.parent||((m=U.current)==null?void 0:m.__r3f.parent);if(!n)return;n.visible=!1;const u=l.xr.enabled,L=l.shadowMap.autoUpdate;J(),l.xr.enabled=!1,l.shadowMap.autoUpdate=!1,l.setRenderTarget(O),l.state.buffers.depth.setMask(!0),l.autoClear||l.clear(),l.render(X,c),A&&Z.render(l,O,Q),l.xr.enabled=u,l.shadowMap.autoUpdate=L,n.visible=!0,l.setRenderTarget(null)}),a.createElement("meshReflectorMaterialImpl",pe({attach:"material",key:"key"+V["defines-USE_BLUR"]+V["defines-USE_DEPTH"]+V["defines-USE_DISTORTION"],ref:U},V,D))});function je(M){const{image:e}=M,{nodes:t,materials:i}=K("Models/monitor.glb"),h=xe.useMemo(()=>{const r=document.createElement("video");return r.src="background.mkv",r.crossOrigin="Anonymous",r.loop=!0,r.muted=!0,r.generateMipmaps=!1,r.minFilter=B,r.magFilter=B,r.format=ge,r},[]),[d,v]=a.useState(null),[p,x]=a.useState(!0),o=e>=0?_e(Me,Se.Projets[e].Thumbnail):null;a.useEffect(()=>{o?(o.minFilter=B,o.magFilter=B,o.flipY=!1,v(o),x(!1)):(v(null),x(!1))},[o]),a.useEffect(()=>{h.play()},[h]);const g=r=>{const _=new De(r);return _.flipY=!1,_};return s.jsxs("group",{...M,dispose:null,rotation:[0,.8,0],"position-y":-3,scale:15,children:[s.jsxs("mesh",{"position-y":.01,"rotation-x":-Math.PI/2,children:[s.jsx("planeGeometry",{args:[100,100]}),s.jsx(Fe,{blur:[100,100],resolution:[2048],mixBlur:1,mixStrength:10,roughness:1,depthScale:1,opacity:.5,transparent:!0,minDepthThreshold:.4,maxDepthThreshold:1.4,color:"#333",metalness:.5})]}),s.jsx("mesh",{castShadow:!0,receiveShadow:!0,geometry:t.Keyboard.geometry,material:i.Computer,position:[0,.004,-.006],rotation:[.004,0,0],children:s.jsx("meshStandardMaterial",{attach:"material",color:"black"})}),s.jsx("mesh",{castShadow:!0,receiveShadow:!0,geometry:t.Mouse.geometry,material:i.Computer,position:[.343,.013,.092],rotation:[.009,0,0],scale:[1.479,1,1],children:s.jsx("meshStandardMaterial",{attach:"material",color:"black"})}),s.jsx("mesh",{geometry:t.Computer_Stand.geometry,material:i.Computer,position:[0,.008,-.126],rotation:[.007,0,0],children:s.jsx("meshStandardMaterial",{attach:"material",color:"black"})}),s.jsx("mesh",{geometry:t.Screen.geometry,material:i.Computer,position:[0,.293,-.182],rotation:[-.057,0,0],children:s.jsx("meshStandardMaterial",{attach:"material",color:"black"})}),s.jsx("mesh",{geometry:t.Screen001.geometry,material:i["Material.001"],position:[0,.293,-.179],rotation:[-.057,0,0],scale:[1,1.066,1],children:p?s.jsx("meshBasicMaterial",{color:"gray"}):d?s.jsx("meshBasicMaterial",{map:d}):s.jsx("meshBasicMaterial",{toneMapped:!1,children:s.jsx("primitive",{attach:"map",object:g(h)})})})]})}K.preload("Models/monitor.glb");export{je as Monitor};
