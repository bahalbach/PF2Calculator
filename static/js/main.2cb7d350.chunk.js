(this.webpackJsonppf2=this.webpackJsonppf2||[]).push([[0],{21:function(e,t,a){e.exports=a(32)},26:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);for(var n,r,c,i,l,s,u,o,d=a(0),m=a.n(d),p=a(7),v=a.n(p),E=(a(26),a(4)),f=a(1),g=a(2),h=a(3),A=a(9),b={STRIKE:"Strike",SAVE:"Save"},R={FIGHTER:"Fighter Melee",MARTIAL:"Martial Melee",CASTER:"Caster(16str) Melee",ALCH:"Alchemist(16str) Melee",FIGHTERR:"Fighter Ranged",MARTIALR:"Martial Ranged",CASTERR:"Caster(16dex) Ranged",ALCHR:"Alchemist(16dex) Ranged",CASTERCA:"Caster Cantrip Attack",CASTERCS:"Caster Cantrip Save",CASTERBR:"Caster 2dX Basic Save",CASTERSA:"Caster Spell Attack",CASTERS:"Caster Save"},C={LOW:"Low",MODERATE:"Moderate",HIGH:"High",EXTREME:"Extreme"},O={TERRIBLE:"Terrible",LOW:"Low",MODERATE:"Moderate",HIGH:"High",EXTREME:"Extreme"},S={AC:"AC",FORT:"Fort",REF:"Ref",WILL:"Will",PER:"Perception"},I={N1:"0 (0x-5)",N2:"-5 (1x-5)",N3:"-10 (2x-5)",A1:"0 (0x-4)",A2:"-4 (1x-4)",A3:"-8 (2x-4)",R1:"0 (0x-3)",R2:"-3 (1x-3)",R3:"-6 (2x-3)",RA1:"0 (0x-2)",RA2:"-2 (1x-2)",RA3:"-4 (2x-2)",RAA1:"0 (0x-1)",RAA2:"-1 (1x-1)",RAA3:"-2 (2x-1)"},T={"0 (0x-5)":"-5 (1x-5)","-5 (1x-5)":"-10 (2x-5)","-10 (2x-5)":"-10 (2x-5)","0 (0x-4)":"-4 (1x-4)","-4 (1x-4)":"-8 (2x-4)","-8 (2x-4)":"-8 (2x-4)","0 (0x-3)":"-3 (1x-3)","-3 (1x-3)":"-6 (2x-3)","-6 (2x-3)":"-6 (2x-3)","0 (0x-2)":"-2 (1x-2)","-2 (1x-2)":"-4 (2x-2)","-4 (2x-2)":"-4 (2x-2)","0 (0x-1)":"-1 (1x-1)","-1 (1x-1)":"-2 (2x-1)","-2 (2x-1)":"-2 (2x-1)"},y={"0 (0x-5)":0,"-5 (1x-5)":-5,"-10 (2x-5)":-10,"0 (0x-4)":0,"-4 (1x-4)":-4,"-8 (2x-4)":-8,"0 (0x-3)":0,"-3 (1x-3)":-3,"-6 (2x-3)":-6,"0 (0x-2)":0,"-2 (1x-2)":-2,"-4 (2x-2)":-4,"0 (0x-1)":0,"-1 (1x-1)":-1,"-2 (2x-1)":-2},j={NORMAL:"Normal",ADVANTAGE:"Advantage",DISADVANTAGE:"Disadvantage"},x={NONE:"None",B:"bludgeoning",P:"piercing",S:"slashing",FIRE:"fire"},k={NONE:"none",COLD_IRON:"cold iron",SILVER:"silver",ADAMANTINE:"adamantine"},N={ALWAYS:"Always",CRIT:"On Crit",SUCC:"On Success",FAIL:"On Failure",CRIF:"On Crit Fail",AT_LEAST_SUCC:"Success or better",AT_LEAST_FAIL:"Failure or better",FAIL_WORSE:"Failure or worse",SUCC_WORSE:"Success or worse"},F={STRIKE:"x1 hit, x2 crit",BASIC:"Basic save",ALWAYS:"Always",CRIT:"On Crit",SUCC:"On Success",FAIL:"On Failure",CRIF:"On Crit Fail",AT_LEAST_SUCC:"Success or better",AT_LEAST_FAIL:"Failure or better",FAIL_WORSE:"Failure or worse",SUCC_WORSE:"Success or worse"},D=(n={},Object(f.a)(n,R.FIGHTER,b.STRIKE),Object(f.a)(n,R.MARTIAL,b.STRIKE),Object(f.a)(n,R.CASTER,b.STRIKE),Object(f.a)(n,R.ALCH,b.STRIKE),Object(f.a)(n,R.FIGHTERR,b.STRIKE),Object(f.a)(n,R.MARTIALR,b.STRIKE),Object(f.a)(n,R.CASTERR,b.STRIKE),Object(f.a)(n,R.ALCHR,b.STRIKE),Object(f.a)(n,R.CASTERCA,b.STRIKE),Object(f.a)(n,R.CASTERCS,b.SAVE),Object(f.a)(n,R.CASTERSA,b.STRIKE),Object(f.a)(n,R.CASTERS,b.SAVE),Object(f.a)(n,R.CASTERBR,b.SAVE),n),L=(r={},Object(f.a)(r,R.FIGHTER,S.AC),Object(f.a)(r,R.MARTIAL,S.AC),Object(f.a)(r,R.CASTER,S.AC),Object(f.a)(r,R.ALCH,S.AC),Object(f.a)(r,R.FIGHTERR,S.AC),Object(f.a)(r,R.MARTIALR,S.AC),Object(f.a)(r,R.CASTERR,S.AC),Object(f.a)(r,R.ALCHR,S.AC),Object(f.a)(r,R.CASTERCA,S.AC),Object(f.a)(r,R.CASTERCS,S.REF),Object(f.a)(r,R.CASTERSA,S.AC),Object(f.a)(r,R.CASTERS,S.REF),Object(f.a)(r,R.CASTERBR,S.REF),r),M=(c={},Object(f.a)(c,R.FIGHTER,F.STRIKE),Object(f.a)(c,R.MARTIAL,F.STRIKE),Object(f.a)(c,R.CASTER,F.STRIKE),Object(f.a)(c,R.ALCH,F.STRIKE),Object(f.a)(c,R.FIGHTERR,F.STRIKE),Object(f.a)(c,R.MARTIALR,F.STRIKE),Object(f.a)(c,R.CASTERR,F.STRIKE),Object(f.a)(c,R.ALCHR,F.STRIKE),Object(f.a)(c,R.CASTERC,F.STRIKE),Object(f.a)(c,R.CASTERS,F.BASIC),Object(f.a)(c,R.CASTERCA,F.STRIKE),Object(f.a)(c,R.CASTERCS,F.BASIC),Object(f.a)(c,R.CASTERSA,F.STRIKE),Object(f.a)(c,R.CASTERS,F.BASIC),Object(f.a)(c,R.CASTERBR,F.BASIC),c),P={},w={},H={},W={},K={},B={},G={},_={},U={},z={},V={},Y=1;Y<=20;Y++)z[Y]=Math.floor((Y+1)/2),V[Y]=2*Math.floor((Y+1)/2);for(var X={},J={},$={},q={},Q={},Z={},ee={},te={},ae={},ne={},re={},ce={},ie={},le={},se=1;se<=20;se++)P[se]=0,w[se]=4,H[se]=3,W[se]=2,K[se]=2,B[se]=2,G[se]=2,_[se]=0,U[se]=1,X[se]=0,J[se]=0,se>=2&&(_[se]=1),se>=4&&(U[se]=2),se>=5&&(W[se]=4,H[se]=4),se>=7&&(K[se]=4,X[se]=1,G[se]=4),se>=10&&(_[se]=2,w[se]=5),se>=11&&(B[se]=4),se>=12&&(U[se]=3),se>=13&&(W[se]=6,J[se]=1),se>=15&&(X[se]=2,H[se]=5,G[se]=6),se>=16&&(_[se]=3),se>=17&&(w[se]=6),se>=19&&(U[se]=4,G[se]=8),se>=20&&(w[se]=7),$[se]=se+W[se]+w[se]+_[se]+2,q[se]=se+W[se]+w[se]+_[se],Q[se]=se+B[se]+H[se]+_[se],Z[se]=se+K[se]+H[se]+_[se],ee[se]=se+G[se]+w[se],te[se]=10+se+G[se]+w[se],ae[se]=w[se]+X[se]*(W[se]+2)/2,ne[se]=X[se]*(W[se]+2)/2,re[se]=w[se]+X[se]*W[se]/2,ce[se]=X[se]*W[se]/2,ie[se]=H[se]+J[se]*B[se]/2,le[se]=J[se]*B[se]/2;var ue=(i={},Object(f.a)(i,R.FIGHTER,$),Object(f.a)(i,R.MARTIAL,q),Object(f.a)(i,R.CASTER,Q),Object(f.a)(i,R.ALCH,Z),Object(f.a)(i,R.FIGHTERR,$),Object(f.a)(i,R.MARTIALR,q),Object(f.a)(i,R.CASTERR,Q),Object(f.a)(i,R.ALCHR,Z),Object(f.a)(i,R.CASTERCA,ee),Object(f.a)(i,R.CASTERCS,te),Object(f.a)(i,R.CASTERSA,ee),Object(f.a)(i,R.CASTERS,te),Object(f.a)(i,R.CASTERBR,te),i),oe=(l={},Object(f.a)(l,R.FIGHTER,U),Object(f.a)(l,R.MARTIAL,U),Object(f.a)(l,R.CASTER,U),Object(f.a)(l,R.ALCH,U),Object(f.a)(l,R.FIGHTERR,U),Object(f.a)(l,R.MARTIALR,U),Object(f.a)(l,R.CASTERR,U),Object(f.a)(l,R.ALCHR,U),Object(f.a)(l,R.CASTERCA,z),Object(f.a)(l,R.CASTERCS,z),Object(f.a)(l,R.CASTERSA,P),Object(f.a)(l,R.CASTERS,P),Object(f.a)(l,R.CASTERBR,V),l),de=(s={},Object(f.a)(s,R.FIGHTER,ae),Object(f.a)(s,R.MARTIAL,re),Object(f.a)(s,R.CASTER,ie),Object(f.a)(s,R.ALCH,ie),Object(f.a)(s,R.FIGHTERR,ne),Object(f.a)(s,R.MARTIALR,ce),Object(f.a)(s,R.CASTERR,le),Object(f.a)(s,R.ALCHR,le),Object(f.a)(s,R.CASTERCA,w),Object(f.a)(s,R.CASTERCS,w),Object(f.a)(s,R.CASTERSA,P),Object(f.a)(s,R.CASTERS,P),Object(f.a)(s,R.CASTERBR,P),s),me={"-1":18,0:19,1:19,2:21,3:22,4:24,5:25,6:27,7:28,8:30,9:31,10:33,11:34,12:36,13:37,14:39,15:40,16:42,17:43,18:45,19:46,20:48,21:49,22:51,23:52,24:54},pe=Object(A.a)({},me);for(var ve in pe)pe[ve]-=3;var Ee=Object(A.a)({},me);for(var fe in Ee)Ee[fe]-=4;var ge=Object(A.a)({},me);for(var he in ge)ge[he]-=6;var Ae=(u={},Object(f.a)(u,C.EXTREME,me),Object(f.a)(u,C.HIGH,pe),Object(f.a)(u,C.MODERATE,Ee),Object(f.a)(u,C.LOW,ge),u),be=(o={},Object(f.a)(o,O.EXTREME,{"-1":9,0:10,1:11,2:12,3:14,4:15,5:17,6:18,7:20,8:21,9:23,10:24,11:26,12:27,13:29,14:30,15:32,16:33,17:35,18:36,19:38,20:39,21:41,22:43,23:44,24:46}),Object(f.a)(o,O.HIGH,{"-1":8,0:9,1:10,2:11,3:12,4:14,5:15,6:17,7:18,8:19,9:21,10:22,11:24,12:25,13:26,14:28,15:29,16:30,17:32,18:33,19:35,20:36,21:38,22:39,23:40,24:42}),Object(f.a)(o,O.MODERATE,{"-1":5,0:6,1:7,2:8,3:9,4:11,5:12,6:14,7:15,8:16,9:18,10:19,11:21,12:22,13:23,14:25,15:26,16:28,17:29,18:30,19:32,20:33,21:35,22:36,23:37,24:38}),Object(f.a)(o,O.LOW,{"-1":2,0:3,1:4,2:5,3:6,4:8,5:9,6:11,7:12,8:13,9:15,10:16,11:18,12:19,13:20,14:22,15:23,16:25,17:26,18:27,19:29,20:30,21:32,22:33,23:34,24:36}),Object(f.a)(o,O.TERRIBLE,{"-1":0,0:1,1:2,2:3,3:4,4:6,5:7,6:8,7:10,8:11,9:12,10:14,11:15,12:16,13:18,14:19,15:20,16:22,17:23,18:24,19:26,20:27,21:28,22:30,23:31,24:32}),o),Re=Object(h.b)(),Ce=0,Oe=Object(h.c)({name:"weaknesses",initialState:Re.getInitialState(),reducers:{weaknessAdded:Re.addOne,weaknessUpdated:Re.updateOne,weaknessCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.type,c=a.value;Re.addOne(e,{id:n,type:r,value:c})},prepare:function(e){var t=e.parentId,a=e.type,n=e.value;return{payload:{id:++Ce,parentId:t,type:a,value:n}}}},weaknessRemoved:Re.removeOne}}),Se=Oe.actions,Ie=Se.weaknessRemoved,Te=Se.weaknessCreated,ye=(Se.weaknessAdded,Se.weaknessUpdated),je=Oe.reducer,xe=Re.getSelectors((function(e){return e.weaknesses})),ke=xe.selectById,Ne=(xe.selectIds,xe.selectEntities),Fe=(xe.selectAll,xe.selectTotal,Object(h.b)()),De=Object(h.c)({name:"targets",initialState:Fe.getInitialState(),reducers:{targetAdded:Fe.addOne,targetUpdated:{prepare:function(e){var t=e.id,a=e.changes,n=e.match,r=e.level;return r||(r=1),r<1&&(r=1),r>20&&(r=20),{payload:{id:t,changes:a,match:n,level:r}}},reducer:function(e,t){Fe.updateOne(e,t.payload);var a=e.entities[t.payload.id];a.level||(a.level=0),a.level<-1&&(a.level=-1),a.level>24&&(a.level=24),a.useDefaultAC&&(a[S.AC]=Ae[a.defaultAC][a.level]),a.useDefaultFort&&(a[S.FORT]=be[a.defaultFort][a.level]),a.useDefaultRef&&(a[S.REF]=be[a.defaultRef][a.level]),a.useDefaultWill&&(a[S.WILL]=be[a.defaultWill][a.level]),a.useDefaultPer&&(a[S.PER]=be[a.defaultPer][a.level])}}},extraReducers:function(e){e.addCase(Te,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].weaknesses.push(r)})).addCase(Ie,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].weaknesses=e.entities[n].weaknesses.filter((function(e){return e!==r}))}))}}),Le=De.actions,Me=Le.targetAdded,Pe=Le.targetUpdated,we=De.reducer,He=Fe.getSelectors((function(e){return e.targets})),We=He.selectById,Ke=(He.selectIds,He.selectEntities);He.selectAll,He.selectTotal;var Be=function(e){var t=e.id,a=e.parentId,n=Object(g.c)((function(e){return ke(e,t)})),r=n.type,c=n.value,i=Object(g.b)();return m.a.createElement("span",{className:"input"},m.a.createElement(Ue,{value:r,onChange:function(e){e.target.value===x.NONE?i(Ie({id:t,parentId:a})):i(ye({id:t,changes:{type:e.target.value}}))}}),m.a.createElement("input",{type:"number",value:c,onChange:function(e){isNaN(e.target.value)||i(ye({id:t,changes:{value:parseInt(e.target.value)}}))}}))},Ge=0,_e=function(e){var t=e.parentId,a=Object(g.b)(),n=Object(d.useState)(0),r=Object(E.a)(n,2),c=r[0],i=r[1];return m.a.createElement("span",{className:"input"},m.a.createElement(Ue,{value:x.NONE,onChange:function(e){e.target.value!==x.NONE&&(Ge++,a(Te({id:Ge,type:e.target.value,value:c,parentId:t})))}}),m.a.createElement("input",{type:"number",value:c,onChange:function(e){return i(parseInt(e.target.value))}}))},Ue=function(e){var t=e.value,a=e.onChange,n=[];for(var r in x)n.push(m.a.createElement("option",{key:r},x[r]));for(var c in k)k[c]!==k.NONE&&n.push(m.a.createElement("option",{key:c},k[c]));return m.a.createElement("span",null,m.a.createElement("select",{value:t,onChange:function(e){return a(e)}},n))},ze=function(e){var t=e.id,a=Object(g.c)((function(e){return We(e,0)})),n=a.name,r=a.level,c=a.matchRoutines,i=a.levelDiff,l=a[S.AC],s=a.defaultAC,u=a.useDefaultAC,o=a[S.FORT],d=a.defaultFort,p=a.useDefaultFort,v=a[S.REF],E=a.defaultRef,h=a.useDefaultRef,A=a[S.WILL],b=a.defaultWill,R=a.useDefaultWill,I=a[S.PER],T=a.defaultPer,y=a.useDefaultPer,j=a.flatfooted,x=a.weaknesses,k=Object(g.b)(),N=[];for(var F in C)N.push(m.a.createElement("option",{key:F},C[F]));var D=[];for(var L in O)D.push(m.a.createElement("option",{key:L},O[L]));return m.a.createElement("div",{className:"box flexbox"},m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"targetName"},"Target Name: "),m.a.createElement("input",{id:"targetName",type:"text",placeholder:"Enter Target name",value:n,onChange:function(e){return k(Pe({id:t,changes:{name:e.target.value}}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"Level"}," Level: "),m.a.createElement("input",{id:"Level",type:"number",value:r,onChange:function(e){return k(Pe({id:t,changes:{level:parseInt(e.target.value)},match:c,level:parseInt(e.target.value)-i}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"match"}," Match routine levels: "),m.a.createElement("input",{type:"checkbox",checked:c,onChange:function(e){return k(Pe({id:t,changes:{matchRoutines:e.target.checked},match:e.target.checked,level:r-i}))}}),m.a.createElement("input",{type:"number",value:i,onChange:function(e){return k(Pe({id:t,changes:{levelDiff:parseInt(e.target.value)},match:c,level:r-parseInt(e.target.value)}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"AC"}," AC: "),m.a.createElement("input",{type:"checkbox",checked:u,onChange:function(e){return k(Pe({id:t,changes:{useDefaultAC:e.target.checked}}))}}),m.a.createElement("select",{value:s,onChange:function(e){return k(Pe({id:t,changes:{defaultAC:e.target.value}}))}},N),m.a.createElement("input",{id:"AC",type:"number",value:l,onChange:function(e){return k(Pe({id:t,changes:Object(f.a)({useDefaultAC:!1},S.AC,parseInt(e.target.value))}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"Fort"}," Fort: "),m.a.createElement("input",{type:"checkbox",checked:p,onChange:function(e){return k(Pe({id:t,changes:{useDefaultFort:e.target.checked}}))}}),m.a.createElement("select",{value:d,onChange:function(e){return k(Pe({id:t,changes:{defaultFort:e.target.value}}))}},D),m.a.createElement("input",{id:"Fort",type:"number",value:o,onChange:function(e){return k(Pe({id:t,changes:Object(f.a)({},S.FORT,parseInt(e.target.value))}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"Ref"}," Ref: "),m.a.createElement("input",{type:"checkbox",checked:h,onChange:function(e){return k(Pe({id:t,changes:{useDefaultRef:e.target.checked}}))}}),m.a.createElement("select",{value:E,onChange:function(e){return k(Pe({id:t,changes:{defaultRef:e.target.value}}))}},D),m.a.createElement("input",{id:"Ref",type:"number",value:v,onChange:function(e){return k(Pe({id:t,changes:Object(f.a)({},S.REF,parseInt(e.target.value))}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"Will"}," Will: "),m.a.createElement("input",{type:"checkbox",checked:R,onChange:function(e){return k(Pe({id:t,changes:{useDefaultWill:e.target.checked}}))}}),m.a.createElement("select",{value:b,onChange:function(e){return k(Pe({id:t,changes:{defaultWill:e.target.value}}))}},D),m.a.createElement("input",{id:"Will",type:"number",value:A,onChange:function(e){return k(Pe({id:t,changes:Object(f.a)({},S.WILL,parseInt(e.target.value))}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"Perception"}," Perception: "),m.a.createElement("input",{type:"checkbox",checked:y,onChange:function(e){return k(Pe({id:t,changes:{useDefaultPer:e.target.checked}}))}}),m.a.createElement("select",{value:T,onChange:function(e){return k(Pe({id:t,changes:{defaultPer:e.target.value}}))}},D),m.a.createElement("input",{id:"Perception",type:"number",value:I,onChange:function(e){return k(Pe({id:t,changes:Object(f.a)({},S.PER,parseInt(e.target.value))}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"Flatfooted"}," Flatfooted: "),m.a.createElement("input",{id:"Flatfooted",type:"checkbox",checked:j,onChange:function(e){return k(Pe({id:t,changes:{flatfooted:e.target.checked}}))}})),m.a.createElement("div",{className:"box flexbox"}," Resistance/Weakness: ",x.map((function(e){return m.a.createElement(Be,{parentId:t,id:e,key:e})})),m.a.createElement(_e,{parentId:t})))},Ve=a(6),Ye=function(e,t){if(0===e.length||0===t.length)throw new Error("Vectors can not be empty!");for(var a=e,n=t,r=0,c=[],i=0;i<a.length;i++){for(var l=0;l<n.length;l++)r+l!==c.length?c[r+l]=c[r+l]+a[i]*n[l]:c.push(a[i]*n[l]);r++}return c},Xe=function(){for(var e=0,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];for(var r=0,c=a;r<c.length;r++){var i=c[r];e=Math.max(e,i[0].staticDamage+i[0].damageDist.length)}for(var l=[],s=0;s<e;s++){l.push(0);var u,o=Object(Ve.a)(a);try{for(o.s();!(u=o.n()).done;){var d=u.value;if(d[0].staticDamage<=s){var m=s-d[0].staticDamage;m<d[0].damageDist.length&&(l[s]+=d[0].damageDist[m]*d[1])}}}catch(p){o.e(p)}finally{o.f()}}return l},Je=function(e,t,a){for(;e<a;)t.length>=2&&(t[1]+=t[0],t.shift()),e++;return[e,t]},$e=Object(h.b)(),qe=1,Qe=Object(h.c)({name:"damages",initialState:$e.getInitialState(),reducers:{damageAdded:$e.addOne,damageUpdated:$e.updateOne,damageCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.damageCondition,c=a.diceNum,i=a.diceSize,l=a.staticDamage,s=a.damageType,u=a.material,o=a.persistent;$e.addOne(e,{id:n,damageCondition:r,diceNum:c,diceSize:i,staticDamage:l,damageType:s,material:u,persistent:o})},prepare:function(e){var t=e.parentId;return{payload:{id:++qe,parentId:t,damageCondition:F.STRIKE,diceNum:0,diceSize:8,staticDamage:0,damageType:x.S,material:k.NONE,persistent:!1}}}},damageRemoved:function(e,t){$e.removeOne(e,t.payload.id)}}}),Ze=Qe.actions,et=Ze.damageRemoved,tt=Ze.damageCreated,at=(Ze.damageAdded,Ze.damageUpdated),nt=Qe.reducer,rt=$e.getSelectors((function(e){return e.damages})),ct=rt.selectById,it=(rt.selectIds,rt.selectEntities);rt.selectAll,rt.selectTotal;function lt(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];function n(t){var r=e.entities[t];if(!r.override){var c=r.defaultActivity;if(r.type=D[c],r.targetType=L[c],r.value=ue[c][r.level],r.damageCondition=M[c],r.diceNum=oe[c][r.level],r.staticDamage=de[c][r.level],a){var i,l=Object(Ve.a)(r.apIds);try{for(l.s();!(i=l.n()).done;){var s=i.value;e.entities[s].level=r.level,n(s)}}catch(u){l.e(u)}finally{l.f()}}}}n(t)}var st=Object(h.b)(),ut=1,ot={level:1,useDefault:!1,defaultActivity:R.FIGHTER,type:b.STRIKE,targetType:S.AC,value:9,MAP:I.N1,damageCondition:F.STRIKE,diceNum:1,diceSize:8,staticDamage:4,damageType:x.S,material:k.NONE},dt=Object(h.c)({name:"activityPaths",initialState:st.getInitialState(),reducers:{activityPathAdded:st.addOne,activityPathUpdated:function(e,t){st.updateOne(e,t.payload),lt(e,t.payload.id)},activityPathRemoved:function(e,t){var a=t.payload,n=a.id,r=a.parentId;st.removeOne(e,n),void 0!==r&&(e.entities[r].apIds=e.entities[r].apIds.filter((function(e){return e!==n})))},activityPathCreated:{reducer:function(e,t){var a,n=t.payload,r=n.id,c=n.parentId,i=n.applyMAP;a=void 0!==c?e.entities[c]:ot,st.addOne(e,{id:r,condition:N.ALWAYS,override:!1,level:a.level,useDefault:a.useDefault,defaultActivity:a.defaultActivity,type:a.type,targetType:a.targetType,targetInfoId:0,value:a.value,MAP:i?T[a.MAP]:a.MAP,damageCondition:a.damageCondition,diceNum:a.diceNum,diceSize:a.diceSize,staticDamage:a.staticDamage,damageType:a.damageType,material:a.material,damages:[],effects:[],apIds:[]}),void 0!==c&&e.entities[c].apIds.push(r)},prepare:function(e){var t=e.parentId,a=e.routineId,n=e.applyMAP;return{payload:{id:++ut,parentId:t,routineId:a,applyMAP:n}}}}},extraReducers:function(e){e.addCase(tt,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].damages.push(r)})).addCase(et,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].damages=e.entities[n].damages.filter((function(e){return e!==r}))})).addCase(Pe,(function(e,t){var a=t.payload,n=a.match,r=a.level;if(n){var c,i=Object(Ve.a)(e.ids);try{for(i.s();!(c=i.n()).done;){var l=c.value;e.entities[l].level=r,lt(e,l,!1)}}catch(s){i.e(s)}finally{i.f()}}}))}}),mt=dt.actions,pt=mt.activityPathCreated,vt=mt.activityPathAdded,Et=mt.activityPathUpdated,ft=mt.activityPathRemoved,gt=dt.reducer,ht=st.getSelectors((function(e){return e.activityPaths})),At=ht.selectById,bt=(ht.selectIds,ht.selectEntities),Rt=(ht.selectAll,ht.selectTotal,Object(h.b)()),Ct=1,Ot=Object(h.c)({name:"routines",initialState:Rt.getInitialState({selectedRoutine:0}),reducers:{setRoutine:function(e,t){e.selectedRoutine=t.payload||0},routineAdded:Rt.addOne,routineUpdated:Rt.updateOne,routineRemoved:function(e,t){Rt.removeOne(e,t),t.payload===e.selectedRoutine&&(e.selectedRoutine=e.ids?e.ids[0]:void 0)},routineCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.name,c=a.apIds;e.selectedRoutine=n,Rt.addOne(e,{id:n,name:r,display:!0,apIds:c})},prepare:function(){return{payload:{id:++Ct,name:"New Routine",apIds:[]}}}}},extraReducers:function(e){e.addCase(pt,(function(e,t){var a=t.payload,n=a.routineId,r=a.id;void 0!==n&&e.entities[n].apIds.push(r)})).addCase(ft,(function(e,t){var a=t.payload,n=a.routineId,r=a.id;void 0!==n&&(e.entities[n].apIds=e.entities[n].apIds.filter((function(e){return e!==r})))}))}}),St=Ot.actions,It=St.routineCreated,Tt=St.setRoutine,yt=(St.updateSelected,St.routineAdded),jt=St.routineUpdated,xt=St.routineRemoved,kt=Ot.reducer,Nt=Rt.getSelectors((function(e){return e.routines})),Ft=Nt.selectById,Dt=(Nt.selectIds,Nt.selectEntities),Lt=Nt.selectAll,Mt=(Nt.selectTotal,function(e){return e.routines.selectedRoutine}),Pt=a(17),wt=a(18);var Ht=function(e,t,a,n,r,c,i){e=n?e.persistent:e.normal;var l=function(e,t,a){if(0===a)return[0,[1]];if(1===a)return[e,t];var n,r=[0],c=0,i=Math.floor(e*a),l=0,s=i,u=Object(Ve.a)(t);try{for(u.s();!(n=u.n()).done;){var o=n.value,d=Math.floor((e+l)*a);if(d===s)r[c]+=o;else{if(d>s+1)for(var m=0;m<d-(s+1);m++)r[++c]=0;r[++c]=o}s=d,l++}}catch(p){u.e(p)}finally{u.f()}return[i,r]}(r,c,i),s=Object(E.a)(l,2);r=s[0],c=s[1],t in e?(e[t].staticDamage+=r,e[t].damageDist=Ye(e[t].damageDist,c),a!==k.NONE&&(e[t].material=a)):e[t]={material:a,staticDamage:r,damageDist:c}};var Wt=function(){function e(t,a,n,r){Object(Pt.a)(this,e),this.activityPaths=t,this.targets=a,this.damages=n,this.weaknesses=r}return Object(wt.a)(e,[{key:"evalPath",value:function(e){var t=this,a=this.targets[0],n=e.damages.map((function(e){return t.damages[e]}));n.push(e);var r=a.weaknesses.map((function(e){return t.weaknesses[e]})),c=function(e,t,a,n){var r,c;switch(e.type){case b.STRIKE:r=e.value,r+=y[e.MAP],c=a[e.targetType],e.targetType===S.AC?a.flatfooted&&(c-=2):c+=10;break;case b.SAVE:r=a[e.targetType],c=e.value,e.targetType===S.AC&&(r-=10);break;default:console.log("Activity type ".concat(e.type," not implemented"))}var i=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e-t;return n<-20?0:-20===n?5:n<-9?a?10:5:n<8?5*(11+n):95}(r,c),l=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e-t;return n<-29?0:n<-20?5:-20===n?0:n<-9?5*(a?19:20+n):n<-1?50:n<9?5*(8-n):5}(r,c),s=function(e,t){var a=e-t;return a<-29?5:a<-20?5*(29+a):a<-10?45:a<-1?5*(-2-a):a<9?5:0}(r,c),u=function(e,t){var a=e-t;return a<-29?95:a<-10?5*(-10-a):a<-1?5:0}(r,c);if(e.rollType===j.ADVANTAGE){var o=100-i,d=o-l,m=d-s;s=100-m*m/100-(l=100-d*d/100-(i=100-o*o/100))-i,u=u*u/100}else if(e.rollType===j.DISADVANTAGE){var p=100-u,v=p-s,f=v-l;l=100-f*f/100-(s=100-v*v/100-(u=100-p*p/100))-u,i=i*i/100}var g=[i/100,l/100,s/100,u/100],h={normal:{},persistent:{}},A={normal:{},persistent:{}},R={normal:{},persistent:{}},C={normal:{},persistent:{}},O=[h,A,R,C];t.forEach((function(e){var t=e.damageCondition,a=e.diceNum,n=e.diceSize,r=e.staticDamage,c=e.damageType,i=e.material,l=e.persistent;r||(r=0);for(var s=[1],u=[],o=0;o<n;o++)u.push(1/n);for(var d=0;d<a;d++)s=Ye(s,u);switch(r+=a,t){case F.STRIKE:Ht(A,c,i,l,r,s,1),Ht(h,c,i,l,r,s,2);break;case F.BASIC:Ht(A,c,i,l,r,s,.5),Ht(R,c,i,l,r,s,1),Ht(C,c,i,l,r,s,2);break;case F.CRIF:Ht(C,c,i,l,r,s,1);break;case F.FAIL:Ht(R,c,i,l,r,s,1);break;case F.SUCC:Ht(A,c,i,l,r,s,1);break;case F.CRIT:Ht(h,c,i,l,r,s,1);break;case F.AT_LEAST_SUCC:Ht(A,c,i,l,r,s,1),Ht(h,c,i,l,r,s,1);break;case F.AT_LEAST_FAIL:Ht(R,c,i,l,r,s,1),Ht(A,c,i,l,r,s,1),Ht(h,c,i,l,r,s,1);break;case F.FAIL_WORSE:Ht(C,c,i,l,r,s,1),Ht(R,c,i,l,r,s,1);break;case F.SUCC_WORSE:Ht(C,c,i,l,r,s,1),Ht(R,c,i,l,r,s,1),Ht(A,c,i,l,r,s,1);break;case F.ALWAYS:Ht(C,c,i,l,r,s,1),Ht(R,c,i,l,r,s,1),Ht(A,c,i,l,r,s,1),Ht(h,c,i,l,r,s,1);break;default:console.log("Damage condition ".concat(e.condition," not implemented yet."))}}));for(var I=0,T=O;I<T.length;I++)for(var x=T[I],k=0,N=["normal","persistent"];k<N.length;k++){var D=N[k],L=0,M=[1],P=function(e){var t=x[D][e],a=t.material,r=t.staticDamage,c=t.damageDist;if(r<0){var i=Je(r,c,1),l=Object(E.a)(i,2);r=l[0],c=l[1]}var s=0,u=0;n.forEach((function(t){t.type!==e&&t.type!==a||(t.value<0?s=Math.min(s,t.value):t.value>0&&(u=Math.max(u,t.value)))}));var o=Je(r-=u+s,c,0),d=Object(E.a)(o,2);r=d[0],c=d[1],L+=r,M=Ye(M,c)};for(var w in x[D])P(w);x[D].staticDamage=L,x[D].damageDist=M}return[O,g]}(e,n,a,r),i=Object(E.a)(c,2),l=i[0],s=i[1];return e.apIds.forEach((function(e){var a=t.activityPaths[e],n=t.evalPath(a),r=Object(E.a)(n,2),c=r[0],i=r[1],s=[];switch(a.condition){case N.ALWAYS:s=[0,1,2,3];break;case N.AT_LEAST_FAIL:s=[0,1,2];break;case N.AT_LEAST_SUCC:s=[0,1];break;case N.CRIF:s=[3];break;case N.CRIT:s=[0];break;case N.FAIL:s=[2];break;case N.FAIL_WORSE:s=[2,3];break;case N.SUCC:s=[1];break;case N.SUCC_WORSE:s=[1,2,3]}for(var u=0,o=s;u<o.length;u++){var d=o[u];l[d].normal.damageDist=Ye(l[d].normal.damageDist,c),l[d].persistent.damageDist=Ye(l[d].persistent.damageDist,i)}})),[Xe([l[0].normal,s[0]],[l[1].normal,s[1]],[l[2].normal,s[2]],[l[3].normal,s[3]]),Xe([l[0].persistent,s[0]],[l[1].persistent,s[1]],[l[2].persistent,s[2]],[l[3].persistent,s[3]])]}}]),e}(),Kt=a(19),Bt=a.n(Kt),Gt=a(20),_t=a.n(Gt)()(Bt.a),Ut=function(){var e=Object(d.useState)(!1),t=Object(E.a)(e,2),a=t[0],n=t[1],r=Object(d.useState)(2),c=Object(E.a)(r,2),i=(c[0],c[1],Object(g.c)(Dt)),l=Object(g.c)(bt),s=Object(g.c)(Ke),u=Object(g.c)(it),o=Object(g.c)(Ne),p=s[0],v="Expected Damage Vs";v+=" AC: "+p[S.AC],v+=" Fort: "+p[S.FORT],v+=" Ref: "+p[S.REF],v+=" Will: "+p[S.WILL],v+=" Per: "+p[S.PER];var f=new Wt(l,s,u,o),h=0,A=0,b=[],R=[],C=[],O=[];for(var I in i){var T=i[I];if(T.display){for(var y=0,j=0,x=[1],k=[1],N=0;N<T.apIds.length;N++){var F=l[T.apIds[N]],D=f.evalPath(F),L=Object(E.a)(D,2),M=L[0],P=L[1];x=Ye(x,M),k=Ye(k,P)}h=Math.max(h,x.length-1),A=Math.max(A,k.length-1);for(var w=[],H=[],W=[],K=[],B=1,G=0;G<x.length;G++)w.push(G),H.push(B),B-=x[G],y+=x[G]*G;B=1;for(var _=0;_<k.length;_++)W.push(_),K.push(B),B-=k[_],j+=k[_]*_;b.push({type:"scatter",name:T.name,x:w,y:H,yaxis:"y"}),b.push({type:"bar",name:y.toFixed(2),x:w,y:x}),R.push({type:"scatter",name:T.name,x:W,y:K}),R.push({type:"bar",name:j.toFixed(2),x:W,y:k}),C.push(m.a.createElement("div",{key:T.id},T.name,": ",y.toFixed(2))),O.push(m.a.createElement("div",{key:T.id},T.name,": ",j.toFixed(2)))}}for(var U=[],z=0;z<=h;z++)U.push(z);for(var V=[],Y=0;Y<=A;Y++)V.push(Y);return m.a.createElement("div",{className:"box"},"Show persistent damage:",m.a.createElement("input",{type:"checkbox",checked:a,onChange:function(e){return n(e.target.checked)}}),m.a.createElement("div",null,"Expected Damage:",C),m.a.createElement(_t,{classname:"plot",data:b,layout:{title:v,autosize:!0,xaxis:{title:"damage"},yaxis:{title:"chance"},legend:{x:1,y:1,xanchor:"right"},margin:{l:40,r:40}},useResizeHandler:!0,style:{width:"100%",height:"100%"}}),a?m.a.createElement("div",null,m.a.createElement("div",null,"Expected Persistent Damage:",O),m.a.createElement(_t,{classname:"plot",data:R,layout:{title:"Expected Persistent Damage",autosize:!0,xaxis:{title:"persistent damage"},yaxis:{title:"chance"},legend:{x:1,y:1,xanchor:"right"},margin:{l:40,r:40}},useResizeHandler:!0,style:{width:"100%",height:"100%"}})):"")},zt=[];for(var Vt in N)zt.push(m.a.createElement("option",{key:Vt},N[Vt]));var Yt=[];for(var Xt in R)Yt.push(m.a.createElement("option",{key:Xt},R[Xt]));var Jt=[];for(var $t in b)Jt.push(m.a.createElement("option",{key:$t},b[$t]));var qt=[];for(var Qt in I)qt.push(m.a.createElement("option",{key:Qt},I[Qt]));var Zt=[];for(var ea in S)Zt.push(m.a.createElement("option",{key:ea},S[ea]));var ta=[];for(var aa in j)ta.push(m.a.createElement("option",{key:aa},j[aa]));var na=[];for(var ra in F)na.push(m.a.createElement("option",{key:ra},F[ra]));var ca=[];for(var ia in{0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20})ca.push(m.a.createElement("option",{key:ia},ia));var la=[];for(var sa in{4:4,6:6,8:8,10:10,12:12})la.push(m.a.createElement("option",{key:sa},sa));var ua=[];for(var oa in x)ua.push(m.a.createElement("option",{key:oa},x[oa]));var da=[];for(var ma in k)da.push(m.a.createElement("option",{key:ma},k[ma]));var pa=function(e){var t=e.id,a=Object(g.b)(),n=Object(g.c)((function(e){return Ft(e,t)})).name;return m.a.createElement("div",{className:"box"},m.a.createElement("label",{htmlFor:"routineName"},"Routine Name:"),m.a.createElement("input",{id:"routineName",type:"text",placeholder:"Enter routine name",value:n,onChange:function(e){return a(jt({id:t,changes:{name:e.target.value}}))}}))},va=function e(t){var a=t.id,n=t.parentId,r=t.routineId,c=t.displayCondition,i=void 0===c||c,l=Object(g.c)((function(e){return At(e,a)})),s=l.condition,u=l.level,o=l.override,d=l.defaultActivity,p=l.type,v=l.targetType,E=l.value,f=l.MAP,h=l.rollType,A=l.damageCondition,R=l.diceNum,C=l.diceSize,O=l.staticDamage,S=l.damageType,I=l.material,T=l.damages,y=l.effects,j=l.apIds,x=Object(g.b)();return m.a.createElement("div",{className:"box"},i?m.a.createElement("div",null,"Condition: ",m.a.createElement("select",{value:s,onChange:function(e){return x(Et({id:a,changes:{condition:e.target.value}}))}},zt)):"",m.a.createElement("div",{className:""},m.a.createElement("div",{className:"flexbox"},m.a.createElement("button",{className:"delete",onClick:function(e){x(ft({id:a,parentId:n,routineId:r}))}},"-"),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"override"},"Override: "),m.a.createElement("input",{id:"override",type:"checkbox",checked:o,onChange:function(e){return x(Et({id:a,changes:{override:e.target.checked}}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("label",{htmlFor:"Level"}," Level: "),m.a.createElement("input",{id:"Level",type:"number",value:u,min:1,max:20,onChange:function(e){var t=parseInt(e.target.value)||1;t>20&&(t=20),x(Et({id:a,changes:{level:t}}))}})),m.a.createElement("span",{className:"input"},m.a.createElement("select",{value:d,onChange:function(e){return x(Et({id:a,changes:{defaultActivity:e.target.value}}))}},Yt)),m.a.createElement("span",{className:"input"},m.a.createElement("select",{value:p,onChange:function(e){return x(Et({id:a,changes:{type:e.target.value}}))}},Jt),p===b.STRIKE?" +":" DC: ",m.a.createElement("input",{type:"number",value:E||0,onChange:function(e){return x(Et({id:a,changes:{value:parseInt(e.target.value)}}))}})),m.a.createElement("span",{className:"input"}," MAP: ",m.a.createElement("select",{value:f,onChange:function(e){return x(Et({id:a,changes:{MAP:e.target.value}}))}},qt)),m.a.createElement("span",{className:"input"}," VS: ",m.a.createElement("select",{value:v,onChange:function(e){x(Et({id:a,changes:{targetType:e.target.value}}))}},Zt)),m.a.createElement("span",{className:"input"},m.a.createElement("select",{value:h,onChange:function(e){x(Et({id:a,changes:{rollType:e.target.value}}))}},ta))),m.a.createElement("div",{className:"flexbox"},"Damage:",m.a.createElement("select",{value:A,onChange:function(e){return x(Et({id:a,changes:{damageCondition:e.target.value}}))}},na),m.a.createElement("select",{value:R,onChange:function(e){return x(Et({id:a,changes:{diceNum:parseInt(e.target.value)}}))}},ca),"d",m.a.createElement("select",{value:C,onChange:function(e){return x(Et({id:a,changes:{diceSize:parseInt(e.target.value)}}))}},la)," + ",m.a.createElement("input",{type:"number",value:O,onChange:function(e){return x(Et({id:a,changes:{staticDamage:parseInt(e.target.value)}}))}}),m.a.createElement("select",{value:S,onChange:function(e){x(Et({id:a,changes:{damageType:e.target.value}}))}},ua),m.a.createElement("select",{value:I,onChange:function(e){x(at({id:a,changes:{material:e.target.value}}))}},da)),m.a.createElement("div",{className:"box"},"Additional Damage: ",T.map((function(e){return m.a.createElement(Ea,{parentId:a,id:e,key:e})})),m.a.createElement("button",{className:"add",onClick:function(){return x(tt({parentId:a}))}},"+")),m.a.createElement("div",{className:"box"},"Effects: ",y)),m.a.createElement("div",{className:"box"},j.map((function(t){return m.a.createElement(e,{id:t,parentId:a,key:t})})),m.a.createElement("button",{className:"add",onClick:function(){return x(pt({parentId:a}))}},"+"),m.a.createElement("button",{className:"add",onClick:function(){return x(pt({parentId:a,applyMAP:!0}))}},"+MAP")))},Ea=function(e){var t=e.parentId,a=e.id,n=Object(g.c)((function(e){return ct(e,a)})),r=n.damageCondition,c=n.diceNum,i=n.diceSize,l=n.staticDamage,s=n.damageType,u=n.material,o=n.persistent,d=Object(g.b)();return m.a.createElement("div",{className:"box"},m.a.createElement("button",{className:"delete",onClick:function(e){d(et({id:a,parentId:t}))}},"-"),m.a.createElement("select",{value:r,onChange:function(e){return d(at({id:a,changes:{damageCondition:e.target.value}}))}},na),m.a.createElement("select",{value:c,onChange:function(e){return d(at({id:a,changes:{diceNum:parseInt(e.target.value)}}))}},ca),"d",m.a.createElement("select",{value:i,onChange:function(e){return d(at({id:a,changes:{diceSize:parseInt(e.target.value)}}))}},la)," + ",m.a.createElement("input",{type:"number",value:l,onChange:function(e){return d(at({id:a,changes:{staticDamage:parseInt(e.target.value)}}))}}),m.a.createElement("select",{value:s,onChange:function(e){d(at({id:a,changes:{damageType:e.target.value}}))}},ua),m.a.createElement("select",{value:u,onChange:function(e){d(at({id:a,changes:{material:e.target.value}}))}},da)," Persistent: ",m.a.createElement("input",{type:"checkbox",checked:o,onChange:function(e){return d(at({id:a,changes:{persistent:e.target.checked}}))}}))},fa=function(e){var t=e.routineId,a=Object(g.c)((function(e){return Ft(e,t)})).apIds,n=Object(g.b)();return m.a.createElement("div",{className:"selectedRoutine"},m.a.createElement(pa,{id:t}),a.map((function(e){return m.a.createElement(va,{id:e,routineId:t,key:e,displayCondition:!1})})),m.a.createElement("button",{className:"add",onClick:function(){return n(pt({routineId:t}))}},"+"))},ga=function(){var e=Object(g.c)(Lt),t=Object(g.c)(Mt),a=Object(g.b)(),n=[],r=[];return e.forEach((function(e){n.push(m.a.createElement("option",{value:e.id,key:e.id},e.name)),r.push(m.a.createElement("div",{className:"flexbox",key:e.id},m.a.createElement("button",{className:"remove",onClick:function(){return a(xt(e.id))}},"-"),m.a.createElement("span",{className:e.display?"routineOn":"routineOff",onClick:function(){return a(jt({id:e.id,changes:{display:!e.display}}))}},e.name)))})),m.a.createElement("div",{className:"box"},"Selected Routine:",m.a.createElement("select",{value:t,onChange:function(e){return a(Tt(e.target.value))}},n),m.a.createElement("button",{className:"add",onClick:function(){return a(It())}},"+"),m.a.createElement("div",{className:"routines"},r))},ha=function(){return m.a.createElement("div",{className:"box"},"Import and Export Here")};a(31);var Aa,ba=function(e){var t=Object(g.c)(Mt);return m.a.createElement("div",{className:"PF2App"},m.a.createElement(ze,{id:0}),m.a.createElement(Ut,null),void 0!==t?m.a.createElement(fa,{routineId:t}):"",m.a.createElement(ga,null),m.a.createElement(ha,null))},Ra=Object(h.b)(),Ca=Object(h.c)({name:"effects",initialState:Ra.getInitialState(),reducers:{effectAdded:Ra.addOne,effectUpdated:Ra.updateOne}}),Oa=Ca.actions,Sa=(Oa.effectAdded,Oa.effectUpdated,Ca.reducer),Ia=Ra.getSelectors((function(e){return e.effects})),Ta=(Ia.selectById,Ia.selectIds,Ia.selectEntities,Ia.selectAll,Ia.selectTotal,Object(h.a)({reducer:{routines:kt,activityPaths:gt,damages:nt,effects:Sa,weaknesses:je,targets:we}}));Ta.dispatch(yt({id:0,name:"Fighter",display:!0,apIds:[0]})),Ta.dispatch(vt({id:0,condition:N.ALWAYS,override:!1,level:1,useDefault:!1,defaultActivity:R.FIGHTER,type:b.STRIKE,targetType:S.AC,targetInfoId:0,value:9,MAP:I.N1,rollType:j.NORMAL,damageCondition:F.STRIKE,diceNum:1,diceSize:8,staticDamage:4,damageType:x.S,material:k.NONE,damages:[],effects:[],apIds:[]})),Ta.dispatch(Me((Aa={id:0,name:"Custom Target",overrideDefault:!0,addMods:!1,level:1,matchRoutines:!1,levelDiff:0,useDefaultAC:!0,defaultAC:C.HIGH},Object(f.a)(Aa,S.AC,16),Object(f.a)(Aa,"useDefaultFort",!0),Object(f.a)(Aa,"defaultFort",O.MODERATE),Object(f.a)(Aa,S.FORT,7),Object(f.a)(Aa,"useDefaultRef",!0),Object(f.a)(Aa,"defaultRef",O.MODERATE),Object(f.a)(Aa,S.REF,7),Object(f.a)(Aa,"useDefaultWill",!0),Object(f.a)(Aa,"defaultWill",O.MODERATE),Object(f.a)(Aa,S.WILL,7),Object(f.a)(Aa,"useDefaultPer",!0),Object(f.a)(Aa,"defaultPer",O.MODERATE),Object(f.a)(Aa,S.PER,7),Object(f.a)(Aa,"flatfooted",!1),Object(f.a)(Aa,"weaknesses",[]),Aa)));var ya=Ta;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));v.a.render(m.a.createElement(m.a.StrictMode,null,m.a.createElement(g.a,{store:ya},m.a.createElement(ba,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.2cb7d350.chunk.js.map