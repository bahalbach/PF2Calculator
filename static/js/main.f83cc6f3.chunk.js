(this.webpackJsonppf2=this.webpackJsonppf2||[]).push([[0],{12:function(e,t,a){e.exports=a(25)},17:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(6),i=a.n(c),o=(a(17),a(5)),d=a(3),u=a(1),s=a(2),l=Object(s.b)(),p=0,m=Object(s.c)({name:"weaknesses",initialState:l.getInitialState(),reducers:{weaknessAdded:l.addOne,weaknessUpdated:l.updateOne,weaknessCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.type,c=a.value;l.addOne(e,{id:n,type:r,value:c})},prepare:function(e){var t=e.parentId,a=e.type,n=e.value;return{payload:{id:++p,parentId:t,type:a,value:n}}}},weaknessRemoved:l.removeOne}}),v=m.actions,g=v.weaknessRemoved,f=v.weaknessCreated,E=v.weaknessAdded,b=v.weaknessUpdated,h=m.reducer,I=l.getSelectors((function(e){return e.weaknesses})),O=I.selectById,y=(I.selectIds,I.selectEntities),A=(I.selectAll,I.selectTotal,Object(s.b)()),C=Object(s.c)({name:"targets",initialState:A.getInitialState(),reducers:{targetAdded:A.addOne,targetUpdated:A.updateOne},extraReducers:function(e){e.addCase(f,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].weaknesses.push(r)})).addCase(g,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].weaknesses=e.entities[n].weaknesses.filter((function(e){return e!==r}))}))}}),S=C.actions,k=S.targetAdded,R=S.targetUpdated,j=C.reducer,N=A.getSelectors((function(e){return e.targets})),x=N.selectById,T=(N.selectIds,N.selectEntities),F=(N.selectAll,N.selectTotal,{STRIKE:"Strike",SAVE:"Save"}),L={AC:"AC",FORT:"Fort",REF:"Ref",WILL:"Will",PER:"Perception"},w={N1:"0 (0x-5)",N2:"-5 (1x-5)",N3:"-10 (2x-5)",A1:"0 (0x-4)",A2:"-4 (1x-4)",A3:"-8 (2x-4)",R1:"0 (0x-3)",R2:"-3 (1x-3)",R3:"-6 (2x-3)",RA1:"0 (0x-2)",RA2:"-2 (1x-2)",RA3:"-4 (2x-2)",RAA1:"0 (0x-1)",RAA2:"-1 (1x-1)",RAA3:"-2 (2x-1)"},P={"0 (0x-5)":0,"-5 (1x-5)":-5,"-10 (2x-5)":-10,"0 (0x-4)":0,"-4 (1x-4)":-4,"-8 (2x-4)":-8,"0 (0x-3)":0,"-3 (1x-3)":-3,"-6 (2x-3)":-6,"0 (0x-2)":0,"-2 (1x-2)":-2,"-4 (2x-2)":-4,"0 (0x-1)":0,"-1 (1x-1)":-1,"-2 (2x-1)":-2},_={NONE:"None",B:"bludgeoning",P:"piercing",S:"slashing",FIRE:"fire"},U={NONE:"none",COLD_IRON:"cold iron",SILVER:"silver",ADAMANTINE:"adamantine"},W={ALWAYS:"Always",CRIT:"On Crit",SUCC:"On Success",FAIL:"On Failure",CRIF:"On Crit Fail",AT_LEAST_SUCC:"Success or better",AT_LEAST_FAIL:"Failure or better",FAIL_WORSE:"Failure or worse",SUCC_WORSE:"Success or worse"},D={STRIKE:"x1 hit, x2 crit",BASIC:"Basic save",ALWAYS:"Always",CRIT:"On Crit",SUCC:"On Success",FAIL:"On Failure",CRIF:"On Crit Fail",AT_LEAST_SUCC:"Success or better",AT_LEAST_FAIL:"Failure or better",FAIL_WORSE:"Failure or worse",SUCC_WORSE:"Success or worse"},B={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20},M={4:4,6:6,8:8,10:10,12:12};var K=function(e){var t=e.id,a=e.parentId,n=Object(u.c)((function(e){return O(e,t)})),c=n.type,i=n.value,o=Object(u.b)();return r.a.createElement("span",null,r.a.createElement(V,{value:c,onChange:function(e){e.target.value===_.NONE?o(g({id:t,parentId:a})):o(b({id:t,changes:{type:e.target.value}}))}}),r.a.createElement("input",{type:"number",value:i,onChange:function(e){isNaN(e.target.value)||o(b({id:t,changes:{value:parseInt(e.target.value)}}))}}))},z=0,Y=function(e){var t=e.parentId,a=Object(u.b)(),c=Object(n.useState)(0),i=Object(o.a)(c,2),d=i[0],s=i[1];return r.a.createElement("span",null,r.a.createElement(V,{value:_.NONE,onChange:function(e){e.target.value!==_.NONE&&(z++,a(f({id:z,type:e.target.value,value:d,parentId:t})))}}),r.a.createElement("input",{type:"number",value:d,onChange:function(e){return s(parseInt(e.target.value))}}))},V=function(e){var t=e.value,a=e.onChange,n=[];for(var c in _)n.push(r.a.createElement("option",{key:c},_[c]));for(var i in U)U[i]!==U.NONE&&n.push(r.a.createElement("option",{key:i},U[i]));return r.a.createElement("span",null,r.a.createElement("select",{value:t,onChange:function(e){return a(e)}},n))},J=function(e){var t=e.id,a=Object(u.c)((function(e){return x(e,0)})),n=a.name,c=(a.level,a[L.AC]),i=a[L.FORT],o=a[L.REF],s=a[L.WILL],l=a[L.PER],p=a.flatfooted,m=a.weaknesses,v=Object(u.b)();return r.a.createElement("div",{className:"box"},r.a.createElement("label",{htmlFor:"targetName"},"Target Name:"),r.a.createElement("input",{id:"targetName",type:"text",placeholder:"Enter Target name",value:n,onChange:function(e){return v(R({id:t,changes:{name:e.target.value}}))}})," AC: ",r.a.createElement("input",{type:"number",value:c,onChange:function(e){return v(R({id:t,changes:Object(d.a)({},L.AC,parseInt(e.target.value))}))}})," Fort: ",r.a.createElement("input",{type:"number",value:i,onChange:function(e){return v(R({id:t,changes:Object(d.a)({},L.FORT,parseInt(e.target.value))}))}})," Ref: ",r.a.createElement("input",{type:"number",value:o,onChange:function(e){return v(R({id:t,changes:Object(d.a)({},L.REF,parseInt(e.target.value))}))}})," Will: ",r.a.createElement("input",{type:"number",value:s,onChange:function(e){return v(R({id:t,changes:Object(d.a)({},L.WILL,parseInt(e.target.value))}))}})," Perception: ",r.a.createElement("input",{type:"number",value:l,onChange:function(e){return v(R({id:t,changes:Object(d.a)({},L.PER,parseInt(e.target.value))}))}})," Flatfooted: ",r.a.createElement("input",{type:"checkbox",checked:p,onChange:function(e){return v(R({id:t,changes:{flatfooted:e.target.checked}}))}})," Resistance/Weakness: ",m.map((function(e){return r.a.createElement(K,{parentId:t,id:e,key:e})})),r.a.createElement(Y,{parentId:t}))};var H=Object(s.b)(),$=1,q=Object(s.c)({name:"damages",initialState:H.getInitialState(),reducers:{damageAdded:H.addOne,damageUpdated:H.updateOne,damageCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.condition,c=a.diceNum,i=a.diceSize,o=a.staticDamage,d=a.type,u=a.material,s=a.persistent;H.addOne(e,{id:n,condition:r,diceNum:c,diceSize:i,staticDamage:o,type:d,material:u,persistent:s})},prepare:function(e){var t=e.parentId;return{payload:{id:++$,parentId:t,condition:D.STRIKE,diceNum:0,diceSize:8,staticDamage:0,type:_.B,material:U.NONE,persistent:!1}}}},damageRemoved:function(e,t){console.log(t),H.removeOne(e,t.payload.id)}}}),G=q.actions,Q=G.damageRemoved,X=G.damageCreated,Z=G.damageAdded,ee=G.damageUpdated,te=q.reducer,ae=H.getSelectors((function(e){return e.damages})),ne=ae.selectById,re=(ae.selectIds,ae.selectEntities),ce=(ae.selectAll,ae.selectTotal,Object(s.b)()),ie=1,oe=Object(s.c)({name:"activityPaths",initialState:ce.getInitialState(),reducers:{activityPathAdded:ce.addOne,activityPathUpdated:ce.updateOne,activityPathCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.parentId,c=a.condition,i=a.type,o=a.targetType,d=a.targetInfoId,u=a.value,s=a.MAP,l=a.damages,p=a.effects,m=a.apIds;ce.addOne(e,{id:n,condition:c,type:i,targetType:o,targetInfoId:d,value:u,MAP:s,damages:l,effects:p,apIds:m}),console.log(r),void 0!==r&&e.entities[r].apIds.push(n)},prepare:function(e){var t=e.parentId,a=e.routineId;return{payload:{id:++ie,parentId:t,routineId:a,condition:W.ALWAYS,type:F.STRIKE,targetType:L.AC,targetInfoId:0,value:9,MAP:w.A1,damages:[],effects:[],apIds:[]}}}}},extraReducers:function(e){e.addCase(X,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].damages.push(r)})).addCase(Q,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].damages=e.entities[n].damages.filter((function(e){return e!==r}))}))}}),de=oe.actions,ue=de.activityPathCreated,se=de.activityPathAdded,le=de.activityPathUpdated,pe=oe.reducer,me=ce.getSelectors((function(e){return e.activityPaths})),ve=me.selectById,ge=(me.selectIds,me.selectEntities),fe=(me.selectAll,me.selectTotal,Object(s.b)()),Ee=1,be=Object(s.c)({name:"routines",initialState:fe.getInitialState({selectedRoutine:0}),reducers:{setRoutine:function(e,t){e.selectedRoutine=t.payload||0},routineAdded:fe.addOne,routineUpdated:fe.updateOne,routineCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.name,c=a.apIds;fe.addOne(e,{id:n,name:r,apIds:c})},prepare:function(){return{payload:{id:++Ee,name:"New Routine",apIds:[]}}}}},extraReducers:function(e){e.addCase(ue,(function(e,t){var a=t.payload,n=a.routineId;a.id;void 0!==n&&e.entities[n].apIds.push(n)}))}}),he=be.actions,Ie=he.routineCreated,Oe=he.setRoutine,ye=(he.updateSelected,he.routineAdded),Ae=he.routineUpdated,Ce=be.reducer,Se=fe.getSelectors((function(e){return e.routines})),ke=Se.selectById,Re=(Se.selectIds,Se.selectEntities),je=Se.selectAll,Ne=(Se.selectTotal,function(e){return e.routines.selectedRoutine}),xe=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(2),d=Object(o.a)(i,2),s=d[0],l=d[1],p=Object(u.c)(Re),m=Object(u.c)(ge),v=Object(u.c)(T),g=Object(u.c)(re),f=Object(u.c)(y),E=p[Object(u.c)(Ne)];function b(e,t){var a=v[0],n=t.damages.map((function(e){return g[e]})),r=a.weaknesses.map((function(e){return f[e]})),c=function(e,t,a,n){var r,c;switch(e.type){case F.STRIKE:r=e.value,r+=P[e.MAP],c=a[e.targetType],e.targetType===L.AC?a.flatfooted&&(c-=2):c+=10;break;case F.SAVE:r=a[e.targetType],c=e.value,e.targetType===L.AC&&(r-=10);break;default:console.log("Activity type ".concat(e.type," not implemented"))}var i,o,d,u,s,l=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e-t;return n<-20?0:-20===n?5:n<-9?a?10:5:n<8?5*(11+n):95}(r,c),p=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e-t;return n<-29?0:n<-20?5:-20===n?0:n<-9?5*(a?19:20+n):n<-1?50:n<9?5*(8-n):5}(r,c),m=function(e,t){var a=e-t;return a<-29?5:a<-20?5*(29+a):a<-10?45:a<-1?5*(-2-a):a<9?5:0}(r,c),v=function(e,t){var a=e-t;return a<-29?95:a<-10?5*(-10-a):a<-1?5:0}(r,c),g=0,f=0;return t.forEach((function(e){var t=e.condition,a=e.diceNum,r=e.diceSize,c=e.staticDamage,E=e.type,b=e.material,h=e.persistent;switch(u=0,s=0,n.forEach((function(e){e.type!==E&&e.type!==b||(e.value<0?u=Math.min(u,e.value):e.value>0&&(s=Math.max(s,e.value)))})),(c>0||a>0)&&(c-=u),(c-=s)<-a?(console.log("Damage not correct..., < 0 not handled"),o=(r+1)*a/2+c):o=(r+1)*a/2+c,t){case D.STRIKE:i=p+2*l;break;case D.BASIC:i=.5*p+m+2*v;break;case D.CRIF:i=v;break;case D.FAIL:i=m;break;case D.SUCC:i=p;break;case D.CRIT:i=l;break;case D.AT_LEAST_SUCC:i=p+l;break;case D.AT_LEAST_FAIL:i=m+p+l;break;case D.FAIL_WORSE:i=m+v;break;case D.SUCC_WORSE:i=p+m+v;break;case D.ALWAYS:i=100;break;default:i=0,console.log("Damage condition ".concat(e.condition," not implemented yet."))}d=i*o,h?f+=d:g+=d,console.log("this damage: m".concat(i," ave").concat(o))})),[g/100,f/100,l/100,p/100,m/100,v/100]}(t,n,a,r),i=Object(o.a)(c,6),d=i[0],u=i[1],s=i[2],l=i[3],p=i[4],E=i[5];return t.apIds.forEach((function(t){var a=m[t],n=e;switch(a.condition){case W.ALWAYS:break;case W.AT_LEAST_FAIL:n*=s+l+p;break;case W.AT_LEAST_SUCC:n*=s+l;break;case W.CRIF:n*=E;break;case W.CRIT:n*=s;break;case W.FAIL:n*=p;break;case W.FAIL_WORSE:n*=p+E;break;case W.SUCC:n*=l;break;case W.SUCC_WORSE:n*=l+p+E}var r=b(n,a),c=Object(o.a)(r,2),i=c[0],v=c[1];d+=i,u+=v})),[d*e,u*e]}var h=0,I=0;return E.apIds.forEach((function(e){var t=b(1,m[e]),a=Object(o.a)(t,2),n=a[0],r=a[1];h+=n,I+=r})),r.a.createElement("div",{className:"box"},"Add persistent damage:",r.a.createElement("input",{type:"checkbox",checked:a,onChange:function(e){return c(e.target.checked)}}),", persistent damage multiplier:",r.a.createElement("input",{type:"number",value:s||0,onChange:function(e){return l(e.target.valueAsNumber)}}),r.a.createElement("div",null,"Expected Damage:",r.a.createElement("p",null,E.name,": ",a?h+I*s:h)),a?"":r.a.createElement("div",null,"Expected Persistent Damage:",r.a.createElement("p",null,E.name,": ",I)))};var Te=function(e){var t=e.id,a=Object(u.b)(),n=Object(u.c)((function(e){return ke(e,t)})).name;return r.a.createElement("div",{className:"box"},r.a.createElement("label",{htmlFor:"routineName"},"Routine Name:"),r.a.createElement("input",{id:"routineName",type:"text",placeholder:"Enter routine name",value:n,onChange:function(e){return a(Ae({id:t,changes:{name:e.target.value}}))}}))},Fe=function e(t){var a=t.id,n=Object(u.c)((function(e){return ve(e,a)})),c=n.condition,i=n.type,o=n.targetType,d=n.value,s=n.MAP,l=n.damages,p=n.effects,m=n.apIds,v=Object(u.b)(),g=[];for(var f in W)g.push(r.a.createElement("option",{key:f},W[f]));var E=[];for(var b in F)E.push(r.a.createElement("option",{key:b},F[b]));var h=[];for(var I in w)h.push(r.a.createElement("option",{key:I},w[I]));var O=[];for(var y in L)O.push(r.a.createElement("option",{key:y},L[y]));return r.a.createElement("div",{className:"box"},c?r.a.createElement("div",null,"Condition:",r.a.createElement("select",{value:c,onChange:function(e){return v(le({id:a,changes:{condition:e.target.value}}))}},g)):"",r.a.createElement("div",{className:"box"},r.a.createElement("select",{value:i,onChange:function(e){return v(le({id:a,changes:{type:e.target.value}}))}},E),i===F.STRIKE?" +":" DC: ",r.a.createElement("input",{type:"number",value:d||0,onChange:function(e){return v(le({id:a,changes:{value:parseInt(e.target.value)}}))}})," MAP: ",r.a.createElement("select",{value:s,onChange:function(e){return v(le({id:a,changes:{MAP:e.target.value}}))}},h)," VS: ",r.a.createElement("select",{value:o,onChange:function(e){v(le({id:a,changes:{targetType:e.target.value}}))}},O),r.a.createElement("div",{className:"box"},"Damage: ",l.map((function(e){return r.a.createElement(Le,{parentId:a,id:e,key:e})})),r.a.createElement("button",{className:"add",onClick:function(){return v(X({parentId:a}))}},"+")),r.a.createElement("div",{className:"box"},"Effects: ",p)),r.a.createElement("div",{className:"box"},m.map((function(t){return r.a.createElement(e,{id:t,key:t})})),r.a.createElement("button",{className:"add",onClick:function(){return v(ue({parentId:a}))}},"+")))},Le=function(e){var t=e.parentId,a=e.id,n=Object(u.c)((function(e){return ne(e,a)})),c=n.condition,i=n.diceNum,o=n.diceSize,d=n.staticDamage,s=n.type,l=n.material,p=n.persistent,m=Object(u.b)(),v=[];for(var g in D)v.push(r.a.createElement("option",{key:g},D[g]));var f=[];for(var E in B)f.push(r.a.createElement("option",{key:E},E));var b=[];for(var h in M)b.push(r.a.createElement("option",{key:h},h));var I=[];for(var O in _)I.push(r.a.createElement("option",{key:O},_[O]));var y=[];for(var A in U)y.push(r.a.createElement("option",{key:A},U[A]));return r.a.createElement("div",{className:"box"},r.a.createElement("button",{className:"delete",onClick:function(e){m(Q({id:a,parentId:t}))}},"-"),r.a.createElement("select",{value:c,onChange:function(e){return m(ee({id:a,changes:{condition:e.target.value}}))}},v),r.a.createElement("select",{value:i,onChange:function(e){return m(ee({id:a,changes:{diceNum:parseInt(e.target.value)}}))}},f),"d",r.a.createElement("select",{value:o,onChange:function(e){return m(ee({id:a,changes:{diceSize:parseInt(e.target.value)}}))}},b)," + ",r.a.createElement("input",{type:"number",value:d,onChange:function(e){return m(ee({id:a,changes:{staticDamage:parseInt(e.target.value)}}))}}),r.a.createElement("select",{value:s,onChange:function(e){m(ee({id:a,changes:{type:e.target.value}}))}},I),r.a.createElement("select",{value:l,onChange:function(e){m(ee({id:a,changes:{material:e.target.value}}))}},y)," Persistent: ",r.a.createElement("input",{type:"checkbox",checked:p,onChange:function(e){return m(ee({id:a,changes:{persistent:e.target.checked}}))}}))},we=function(){var e=Object(u.c)(Ne),t=Object(u.c)((function(t){return ke(t,e)})).apIds,a=Object(u.b)();return r.a.createElement("div",{className:"selectedRoutine"},r.a.createElement(Te,{id:e}),t.map((function(e){return r.a.createElement(Fe,{id:e,key:e})})),r.a.createElement("button",{className:"add",onClick:function(){return a(ue({routineId:e}))}},"+"))},Pe=function(){var e=Object(u.c)(je),t=Object(u.c)(Ne),a=Object(u.b)(),n=[];return e.forEach((function(e){n.push(r.a.createElement("option",{value:e.id,key:e.id},e.name))})),r.a.createElement("div",{className:"box"},"Selected Routine:",r.a.createElement("select",{value:t,onChange:function(e){return a(Oe(e.target.value))}},n),r.a.createElement("button",{className:"add",onClick:function(){return a(Ie())}},"+"))},_e=function(){return r.a.createElement("div",{className:"box"},"Import and Export Here")};a(24);var Ue,We=function(e){return r.a.createElement("div",{className:"PF2App"},r.a.createElement(J,{id:0}),r.a.createElement(xe,null),r.a.createElement(we,null),r.a.createElement(Pe,null),r.a.createElement(_e,null))},De=Object(s.b)(),Be=Object(s.c)({name:"effects",initialState:De.getInitialState(),reducers:{effectAdded:De.addOne,effectUpdated:De.updateOne}}),Me=Be.actions,Ke=(Me.effectAdded,Me.effectUpdated,Be.reducer),ze=De.getSelectors((function(e){return e.effects})),Ye=(ze.selectById,ze.selectIds,ze.selectEntities,ze.selectAll,ze.selectTotal,Object(s.a)({reducer:{routines:Ce,activityPaths:pe,damages:te,effects:Ke,weaknesses:h,targets:j}}));Ye.dispatch(ye({id:0,name:"tesdt",apIds:[0]})),Ye.dispatch(se({id:0,condition:null,type:F.STRIKE,targetType:L.AC,targetInfoId:0,value:9,MAP:w.A1,damages:[0],effects:[],apIds:[]})),Ye.dispatch(k((Ue={id:0,name:"Custom Target",overrideDefault:!0,addMods:!1,level:1},Object(d.a)(Ue,L.AC,15),Object(d.a)(Ue,L.FORT,6),Object(d.a)(Ue,L.REF,5),Object(d.a)(Ue,L.WILL,4),Object(d.a)(Ue,L.PER,5),Object(d.a)(Ue,"flatfooted",!1),Object(d.a)(Ue,"weaknesses",[0]),Ue))),Ye.dispatch(E({id:0,type:_.FIRE,value:10})),Ye.dispatch(Z({id:0,condition:D.STRIKE,diceNum:1,diceSize:8,staticDamage:4,type:_.B,material:U.COLD_IRON,persistent:!1}));var Ve=Ye;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u.a,{store:Ve},r.a.createElement(We,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.f83cc6f3.chunk.js.map