(this.webpackJsonppf2=this.webpackJsonppf2||[]).push([[0],{28:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),c=a.n(i),s=(a(28),a(11)),l=a.n(s),d=a(5),o=a(2),u=a(4),p=Object(u.b)(),m=0,f=Object(u.c)({name:"weaknesses",initialState:p.getInitialState(),reducers:{weaknessAdded:p.addOne,weaknessUpdated:p.updateOne,weaknessCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.type,i=a.value;p.addOne(e,{id:n,type:r,value:i})},prepare:function(e){var t=e.parentId,a=e.type,n=e.value;return{payload:{id:++m,parentId:t,type:a,value:n}}}},weaknessRemoved:p.removeOne}}),E=f.actions,v=E.weaknessRemoved,g=E.weaknessCreated,h=(E.weaknessAdded,E.weaknessUpdated),A=f.reducer,b=p.getSelectors((function(e){return e.weaknesses})),O=b.selectById,y=(b.selectIds,b.selectEntities),T=(b.selectAll,b.selectTotal,Object(u.b)()),I=Object(u.c)({name:"targets",initialState:T.getInitialState(),reducers:{targetAdded:T.addOne,targetUpdated:{prepare:function(e){var t=e.id,a=e.changes,n=e.match,r=e.level;return r||(r=1),r<1&&(r=1),r>20&&(r=20),{payload:{id:t,changes:a,match:n,level:r}}},reducer:function(e,t){T.updateOne(e,t.payload)}}},extraReducers:function(e){e.addCase(g,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].weaknesses.push(r)})).addCase(v,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].weaknesses=e.entities[n].weaknesses.filter((function(e){return e!==r}))}))}}),C=I.actions,x=C.targetAdded,R=C.targetUpdated,S=I.reducer,N=T.getSelectors((function(e){return e.targets})),j=N.selectById,D=(N.selectIds,N.selectEntities),L=(N.selectAll,N.selectTotal,{DISTRIBUTION:"Damage Distribution",PMDEFENSE:"+/- AC/Save Bonus",PMRES:"+/- Resistance/Weakness"}),k={LOW:"Low",MODERATE:"Moderate",HIGH:"High",EXTREME:"Extreme"},P={TERRIBLE:"Terrible",LOW:"Low",MODERATE:"Moderate",HIGH:"High",EXTREME:"Extreme"},F={ALWAYS:"Always",CRIT:"On Crit",SUCC:"On Success",FAIL:"On Failure",CRIF:"On Crit Fail",AT_LEAST_SUCC:"Success or better",AT_LEAST_FAIL:"Failure or better",FAIL_WORSE:"Failure or worse",SUCC_WORSE:"Success or worse"},M={NORMAL:"Normal",ADVANTAGE:"Advantage",DISADVANTAGE:"Disadvantage"},W={STRIKE:"Strike",SAVE:"Save"},w={TRAINED:"Trained Proficiency",FIGHTERWEAPON:"Fighter Weapon (1, 5, 13)",MARTIALWEAPON:"Martial Weapon (5, 13)",CASTERWEAPON:"Caster Weapon (11)",ALCHWEAPON:"Alchemist Weapon (7)",CASTERSPELL:"Caster Spell (7, 15, 19)",MAGUSSPELL:"Magus Spell (9, 17)",MCSPELL:"MC SPELL (12, 18)",MAXSKILL:"Max skill (3, 7, 15)"},G={AS10:"10",AS18a:"18 to 24 apex(17)",AS16a:"16 to 22 apex(17)",AS16pp:"16 to 20",AS16p:"16 to 18",AS14pp:"14 to 20",AS14p:"14 to 18"},H={NONE:"None",WEAPON:"Weapon (2, 10, 16)",SKILL:"Skill (3, 9, 17)"},U={N1:"0 (0x-5)",N2:"-5 (1x-5)",N3:"-10 (2x-5)",A1:"0 (0x-4)",A2:"-4 (1x-4)",A3:"-8 (2x-4)",R1:"0 (0x-3)",R2:"-3 (1x-3)",R3:"-6 (2x-3)",RA1:"0 (0x-2)",RA2:"-2 (1x-2)",RA3:"-4 (2x-2)",RAA1:"0 (0x-1)",RAA2:"-1 (1x-1)",RAA3:"-2 (2x-1)"},_={"0 (0x-5)":"-5 (1x-5)","-5 (1x-5)":"-10 (2x-5)","-10 (2x-5)":"-10 (2x-5)","0 (0x-4)":"-4 (1x-4)","-4 (1x-4)":"-8 (2x-4)","-8 (2x-4)":"-8 (2x-4)","0 (0x-3)":"-3 (1x-3)","-3 (1x-3)":"-6 (2x-3)","-6 (2x-3)":"-6 (2x-3)","0 (0x-2)":"-2 (1x-2)","-2 (1x-2)":"-4 (2x-2)","-4 (2x-2)":"-4 (2x-2)","0 (0x-1)":"-1 (1x-1)","-1 (1x-1)":"-2 (2x-1)","-2 (2x-1)":"-2 (2x-1)"},B={AC:"AC",FORT:"Fort",REF:"Ref",WILL:"Will",PER:"Perception"},V={STRIKE:"x1 hit, x2 crit",BASIC:"Basic save",ALWAYS:"Always",CRIT:"On Crit",SUCC:"On Success",FAIL:"On Failure",CRIF:"On Crit Fail",AT_LEAST_SUCC:"Success or better",AT_LEAST_FAIL:"Failure or better",FAIL_WORSE:"Failure or worse",SUCC_WORSE:"Success or worse"},K={NONE:"None",FIGHTERMELEE:"Fighter Melee",FIGHTERRANGED:"Fighter Ranged",MARTIALMELEE:"Martial Melee",MARTIALRANGED:"Martial Ranged",CASTERCANTRIP:"Caster Cantrip",CASTERMELEE:"Caster Melee",CASTERRANGED:"Caster Ranged"},z={NONE:"None",WEAPON:"Weapon (1, 4, 12, 19)",SPELLLEVEL1:"1 x Spell Level",SPELLLEVEL2:"2 x Spell Level"},Y={NONE:"None",B:"bludgeoning",P:"piercing",S:"slashing",FIRE:"fire"},X={NONE:"none",COLD_IRON:"cold iron",SILVER:"silver",ADAMANTINE:"adamantine"},J={FLATFOOT:"Flatfooted",FRIGHTENED1:"Frightened 1",FRIGHTENED2:"Frightened 2",FRIGHTENED3:"Frightened 3",FRIGHTENED4:"Frightened 4"};for(var $=function(e){var t=e.id,a=e.parentId,n=Object(o.c)((function(e){return O(e,t)})),i=n.type,c=n.value,s=Object(o.b)();return r.a.createElement("span",{className:"input"},r.a.createElement(Z,{value:i,onChange:function(e){e.target.value===Y.NONE?s(v({id:t,parentId:a})):s(h({id:t,changes:{type:e.target.value}}))}}),r.a.createElement("input",{type:"number",value:c,onChange:function(e){isNaN(e.target.value)||s(h({id:t,changes:{value:parseInt(e.target.value)}}))}}))},q=0,Q=function(e){var t=e.parentId,a=Object(o.b)(),i=Object(n.useState)(0),c=Object(d.a)(i,2),s=c[0],l=c[1];return r.a.createElement("span",{className:"input"},r.a.createElement(Z,{value:Y.NONE,onChange:function(e){e.target.value!==Y.NONE&&(q++,a(g({id:q,type:e.target.value,value:s,parentId:t})))}}),r.a.createElement("input",{type:"number",value:s,onChange:function(e){return l(parseInt(e.target.value))}}))},Z=function(e){var t=e.value,a=e.onChange,n=[];for(var i in Y)n.push(r.a.createElement("option",{key:i},Y[i]));for(var c in X)X[c]!==X.NONE&&n.push(r.a.createElement("option",{key:c},X[c]));return r.a.createElement("span",null,r.a.createElement("select",{value:t,onChange:function(e){return a(e)}},n))},ee=function(e){var t=e.id,a=Object(o.c)((function(e){return j(e,0)})),n=a.name,i=a.levelDiff,c=a.ACTrend,s=a.FortTrend,l=a.RefTrend,d=a.WillTrend,u=a.PerTrend,p=a.flatfooted,m=a.weaknesses,f=Object(o.b)(),E=[];for(var v in k)E.push(r.a.createElement("option",{key:v},k[v]));var g=[];for(var h in P)g.push(r.a.createElement("option",{key:h},P[h]));return r.a.createElement("div",{className:"box flexbox"},r.a.createElement("span",{className:"input"},r.a.createElement("label",{htmlFor:"targetName"},"Target Name: "),r.a.createElement("input",{id:"targetName",type:"text",placeholder:"Enter Target name",value:n,onChange:function(e){return f(R({id:t,changes:{name:e.target.value}}))}})),r.a.createElement("span",{className:"input"},r.a.createElement("label",{htmlFor:"levelDiff"}," Level Difference: "),r.a.createElement("input",{type:"number",id:"levelDiff",value:i,onChange:function(e){return f(R({id:t,changes:{levelDiff:parseInt(e.target.value)}}))}})),r.a.createElement("span",{className:"input"},r.a.createElement("label",{htmlFor:"AC"}," AC: "),r.a.createElement("select",{id:"AC",value:c,onChange:function(e){return f(R({id:t,changes:{ACTrend:e.target.value}}))}},E)),r.a.createElement("span",{className:"input"},r.a.createElement("label",{htmlFor:"Fort"}," Fort: "),r.a.createElement("select",{id:"Fort",value:s,onChange:function(e){return f(R({id:t,changes:{FortTrend:e.target.value}}))}},g)),r.a.createElement("span",{className:"input"},r.a.createElement("label",{htmlFor:"Ref"}," Ref: "),r.a.createElement("select",{id:"Red",value:l,onChange:function(e){return f(R({id:t,changes:{RefTrend:e.target.value}}))}},g)),r.a.createElement("span",{className:"input"},r.a.createElement("label",{htmlFor:"Will"}," Will: "),r.a.createElement("select",{id:"Will",value:d,onChange:function(e){return f(R({id:t,changes:{WillTrend:e.target.value}}))}},g)),r.a.createElement("span",{className:"input"},r.a.createElement("label",{htmlFor:"Perception"}," Perception: "),r.a.createElement("select",{id:"Perception",value:u,onChange:function(e){return f(R({id:t,changes:{PerTrend:e.target.value}}))}},g)),r.a.createElement("span",{className:"input"},r.a.createElement("label",{htmlFor:"Flatfooted"}," Flatfooted: "),r.a.createElement("input",{id:"Flatfooted",type:"checkbox",checked:p,onChange:function(e){return f(R({id:t,changes:{flatfooted:e.target.checked}}))}})),r.a.createElement("div",{className:"box flexbox"}," Resistance/Weakness: ",m.map((function(e){return r.a.createElement($,{parentId:t,id:e,key:e})})),r.a.createElement(Q,{parentId:t})))},te=a(3),ae=Object(u.b)(),ne={},re=1;re<=20;re++)ne[re]=0;for(var ie=1,ce=Object(u.c)({name:"damages",initialState:ae.getInitialState(),reducers:{damageAdded:ae.addOne,damageUpdated:ae.updateOne,damageCreated:{reducer:function(e,t){var a=t.payload.id;ae.addOne(e,{id:a,damageCondition:V.STRIKE,damageType:Y.S,material:X.NONE,persistent:!1,multiplier:1,dieTrend:z.NONE,dieAdjustments:Object(te.a)({},ne),diceSize:6,damageTrend:K.NONE,damageAdjustments:Object(te.a)({},ne)})},prepare:function(e){var t=e.parentId;return{payload:{id:++ie,parentId:t}}}},damageRemoved:function(e,t){ae.removeOne(e,t.payload.id)}}}),se=ce.actions,le=se.damageRemoved,de=se.damageCreated,oe=se.damageAdded,ue=se.damageUpdated,pe=ce.reducer,me=ae.getSelectors((function(e){return e.damages})),fe=me.selectById,Ee=(me.selectIds,me.selectEntities),ve=(me.selectAll,me.selectTotal,Object(u.b)()),ge=1,he=Object(u.c)({name:"effects",initialState:ve.getInitialState(),reducers:{effectAdded:ve.addOne,effectUpdated:ve.updateOne,effectCreated:{reducer:function(e,t){var a=t.payload.id;ve.addOne(e,{id:a,effectCondition:F.ALWAYS,effectType:J.FLATFOOT,startLevel:1,endLevel:20})},prepare:function(e){var t=e.parentId;return{payload:{id:++ge,parentId:t}}}},effectRemoved:function(e,t){ve.removeOne(e,t.payload.id)}}}),Ae=he.actions,be=(Ae.effectAdded,Ae.effectUpdated),Oe=Ae.effectCreated,ye=Ae.effectRemoved,Te=he.reducer,Ie=ve.getSelectors((function(e){return e.effects})),Ce=Ie.selectById,xe=(Ie.selectIds,Ie.selectEntities),Re=(Ie.selectAll,Ie.selectTotal,Object(u.b)()),Se={},Ne=1;Ne<=20;Ne++)Se[Ne]=0;for(var je,De,Le,ke,Pe,Fe,Me,We=1,we={rollType:M.NORMAL,type:W.STRIKE,profTrend:w.MARTIALWEAPON,statTrend:G.AS18a,itemTrend:H.WEAPON,bonusAdjustments:Object(te.a)({},Se),MAP:U.N1,targetType:B.AC},Ge=Object(u.c)({name:"activityPaths",initialState:Re.getInitialState(),reducers:{activityPathAdded:Re.addOne,activityPathUpdated:function(e,t){Re.updateOne(e,t.payload)},activityPathRemoved:function(e,t){var a=t.payload,n=a.id,r=a.parentId;Re.removeOne(e,n),void 0!==r&&(e.entities[r].apIds=e.entities[r].apIds.filter((function(e){return e!==n})))},activityPathCreated:{reducer:function(e,t){var a,n=t.payload,r=n.id,i=n.parentId,c=n.applyMAP;a=void 0!==i?e.entities[i]:we,Re.addOne(e,{id:r,condition:F.ALWAYS,rollType:M.NORMAL,type:W.STRIKE,profTrend:a.profTrend,statTrend:a.statTrend,itemTrend:a.itemTrend,bonusAdjustments:Object(te.a)({},a.bonusAdjustments),MAP:c?_[a.MAP]:a.MAP,targetType:B.AC,damages:[],effects:[],apIds:[]}),void 0!==i&&e.entities[i].apIds.push(r)},prepare:function(e){var t=e.parentId,a=e.routineId,n=e.applyMAP;return{payload:{id:++We,parentId:t,routineId:a,applyMAP:n}}}}},extraReducers:function(e){e.addCase(de,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].damages.push(r)})).addCase(le,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].damages=e.entities[n].damages.filter((function(e){return e!==r}))})).addCase(Oe,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].effects.push(r)})).addCase(ye,(function(e,t){var a=t.payload,n=a.parentId,r=a.id;e.entities[n].effects=e.entities[n].effects.filter((function(e){return e!==r}))}))}}),He=Ge.actions,Ue=He.activityPathCreated,_e=He.activityPathAdded,Be=He.activityPathUpdated,Ve=He.activityPathRemoved,Ke=Ge.reducer,ze=Re.getSelectors((function(e){return e.activityPaths})),Ye=ze.selectById,Xe=(ze.selectIds,ze.selectEntities),Je=(ze.selectAll,ze.selectTotal,Object(u.b)()),$e=1,qe=Object(u.c)({name:"routines",initialState:Je.getInitialState({selectedRoutine:0}),reducers:{setRoutine:function(e,t){e.selectedRoutine=t.payload||0},routineAdded:Je.addOne,routineUpdated:Je.updateOne,routineRemoved:function(e,t){Je.removeOne(e,t),t.payload===e.selectedRoutine&&(e.selectedRoutine=e.ids?e.ids[0]:void 0)},routineCreated:{reducer:function(e,t){var a=t.payload,n=a.id,r=a.name,i=a.apIds;e.selectedRoutine=n,Je.addOne(e,{id:n,name:r,display:!0,apIds:i})},prepare:function(){return{payload:{id:++$e,name:"New Routine",apIds:[]}}}}},extraReducers:function(e){e.addCase(Ue,(function(e,t){var a=t.payload,n=a.routineId,r=a.id;void 0!==n&&e.entities[n].apIds.push(r)})).addCase(Ve,(function(e,t){var a=t.payload,n=a.routineId,r=a.id;void 0!==n&&(e.entities[n].apIds=e.entities[n].apIds.filter((function(e){return e!==r})))}))}}),Qe=qe.actions,Ze=Qe.routineCreated,et=Qe.setRoutine,tt=(Qe.updateSelected,Qe.routineAdded),at=Qe.routineUpdated,nt=Qe.routineRemoved,rt=qe.reducer,it=Je.getSelectors((function(e){return e.routines})),ct=it.selectById,st=(it.selectIds,it.selectEntities),lt=it.selectAll,dt=(it.selectTotal,function(e){return e.routines.selectedRoutine}),ot=a(19),ut=a(20),pt=a(14),mt=a(23),ft=function(e,t){if(0===e.length||0===t.length)throw new Error("Vectors can not be empty!");for(var a=e,n=t,r=0,i=[],c=0;c<a.length;c++){for(var s=0;s<n.length;s++)r+s!==i.length?i[r+s]=i[r+s]+a[c]*n[s]:i.push(a[c]*n[s]);r++}return i},Et=function(){for(var e=0,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];for(var r=0,i=a;r<i.length;r++){var c=i[r];e=Math.max(e,c[0].staticDamage+c[0].damageDist.length)}for(var s=[],l=0;l<e;l++){s.push(0);var d,o=Object(pt.a)(a);try{for(o.s();!(d=o.n()).done;){var u=d.value;if(u[0].staticDamage<=l){var p=l-u[0].staticDamage;p<u[0].damageDist.length&&(s[l]+=u[0].damageDist[p]*u[1])}}}catch(m){o.e(m)}finally{o.f()}}return s},vt=function(e,t,a){for(;e<a;)t.length>=2&&(t[1]+=t[0],t.shift()),e++;return[e,t]},gt=a(1),ht={},At={},bt={},Ot={},yt={},Tt={},It={},Ct={},xt={},Rt={},St={},Nt={},jt={},Dt={},Lt={},kt={},Pt={},Ft={},Mt={},Wt=1;Wt<=20;Wt++)Ft[Wt]=Math.floor((Wt+1)/2),Mt[Wt]=2*Math.floor((Wt+1)/2);for(var wt={},Gt={},Ht={},Ut={},_t={},Bt={},Vt={},Kt={},zt={},Yt={},Xt={},Jt={},$t={},qt={},Qt={},Zt={},ea=1;ea<=20;ea++)ht[ea]=0,At[ea]=ea,bt[ea]=ea+2,Ot[ea]=ea+2,yt[ea]=4,Tt[ea]=3,It[ea]=3,Ct[ea]=3,xt[ea]=2,Rt[ea]=2,St[ea]=2,Nt[ea]=2,jt[ea]=2,Dt[ea]=2,zt[ea]=ea+2,Yt[ea]=ea+2,Lt[ea]=0,kt[ea]=0,Pt[ea]=1,wt[ea]=0,Gt[ea]=0,ea>=2&&(Lt[ea]=1),ea>=3&&(Ot[ea]=ea+4,kt[ea]=1),ea>=4&&(Pt[ea]=2),ea>=5&&(St[ea]=4,Tt[ea]=4,It[ea]=4,Ct[ea]=4,xt[ea]=3,Rt[ea]=3),ea>=7&&(Nt[ea]=4,wt[ea]=1,Dt[ea]=4,Ot[ea]=ea+6),ea>=9&&(kt[ea]=2,zt[ea]=ea+4),ea>=10&&(Lt[ea]=2,yt[ea]=5,xt[ea]=4,Rt[ea]=4),ea>=11&&(jt[ea]=4),ea>=12&&(Pt[ea]=3,Yt[ea]=ea+4),ea>=13&&(St[ea]=6,Gt[ea]=1),ea>=15&&(wt[ea]=2,Tt[ea]=5,It[ea]=5,Dt[ea]=6,Ot[ea]=ea+8),ea>=16&&(Lt[ea]=3),ea>=17&&(Tt[ea]=6,yt[ea]=6,kt[ea]=3,zt[ea]=ea+6),ea>=18&&(Yt[ea]=ea+6),ea>=19&&(Pt[ea]=4,Dt[ea]=8),ea>=20&&(yt[ea]=7),Ht[ea]=ea+St[ea]+2,Ut[ea]=ea+St[ea],_t[ea]=ea+jt[ea],Bt[ea]=ea+Nt[ea],Vt[ea]=ea+Dt[ea],Kt[ea]=10+ea+Dt[ea]+yt[ea],Xt[ea]=yt[ea]+wt[ea]*(St[ea]+2)/2,Jt[ea]=wt[ea]*(St[ea]+2)/2,$t[ea]=yt[ea]+wt[ea]*St[ea]/2,qt[ea]=wt[ea]*St[ea]/2,Qt[ea]=Ct[ea]+Gt[ea]*jt[ea]/2,Zt[ea]=Gt[ea]*jt[ea]/2;var ta=(je={},Object(gt.a)(je,w.TRAINED,bt),Object(gt.a)(je,w.FIGHTERWEAPON,Ht),Object(gt.a)(je,w.MARTIALWEAPON,Ut),Object(gt.a)(je,w.CASTERWEAPON,_t),Object(gt.a)(je,w.ALCHWEAPON,Bt),Object(gt.a)(je,w.CASTERSPELL,Vt),Object(gt.a)(je,w.MAGUSSPELL,zt),Object(gt.a)(je,w.MCSPELL,Yt),Object(gt.a)(je,w.MAXSKILL,Ot),je),aa=(De={},Object(gt.a)(De,G.AS10,ht),Object(gt.a)(De,G.AS18a,yt),Object(gt.a)(De,G.AS16a,Tt),Object(gt.a)(De,G.AS16pp,It),Object(gt.a)(De,G.AS16p,Ct),Object(gt.a)(De,G.AS14pp,xt),Object(gt.a)(De,G.AS14p,Rt),De),na=(Le={},Object(gt.a)(Le,H.NONE,ht),Object(gt.a)(Le,H.WEAPON,Lt),Object(gt.a)(Le,H.SKILL,kt),Le),ra={"0 (0x-5)":0,"-5 (1x-5)":-5,"-10 (2x-5)":-10,"0 (0x-4)":0,"-4 (1x-4)":-4,"-8 (2x-4)":-8,"0 (0x-3)":0,"-3 (1x-3)":-3,"-6 (2x-3)":-6,"0 (0x-2)":0,"-2 (1x-2)":-2,"-4 (2x-2)":-4,"0 (0x-1)":0,"-1 (1x-1)":-1,"-2 (2x-1)":-2},ia=(ke={},Object(gt.a)(ke,K.NONE,ht),Object(gt.a)(ke,K.FIGHTERMELEE,Xt),Object(gt.a)(ke,K.MARTIALMELEE,$t),Object(gt.a)(ke,K.CASTERMELEE,Qt),Object(gt.a)(ke,K.FIGHTERRANGED,Jt),Object(gt.a)(ke,K.MARTIALRANGED,qt),Object(gt.a)(ke,K.CASTERRANGED,Zt),Object(gt.a)(ke,K.CASTERCANTRIP,yt),ke),ca=(Pe={},Object(gt.a)(Pe,z.NONE,ht),Object(gt.a)(Pe,z.WEAPON,Pt),Object(gt.a)(Pe,z.SPELLLEVEL1,Ft),Object(gt.a)(Pe,z.SPELLLEVEL2,Mt),Pe),sa={"-1":18,0:19,1:19,2:21,3:22,4:24,5:25,6:27,7:28,8:30,9:31,10:33,11:34,12:36,13:37,14:39,15:40,16:42,17:43,18:45,19:46,20:48,21:49,22:51,23:52,24:54},la=Object(te.a)({},sa);for(var da in la)la[da]-=3;var oa=Object(te.a)({},sa);for(var ua in oa)oa[ua]-=4;var pa=Object(te.a)({},sa);for(var ma in pa)pa[ma]-=6;var fa=(Fe={},Object(gt.a)(Fe,k.EXTREME,sa),Object(gt.a)(Fe,k.HIGH,la),Object(gt.a)(Fe,k.MODERATE,oa),Object(gt.a)(Fe,k.LOW,pa),Fe),Ea=(Me={},Object(gt.a)(Me,P.EXTREME,{"-1":9,0:10,1:11,2:12,3:14,4:15,5:17,6:18,7:20,8:21,9:23,10:24,11:26,12:27,13:29,14:30,15:32,16:33,17:35,18:36,19:38,20:39,21:41,22:43,23:44,24:46}),Object(gt.a)(Me,P.HIGH,{"-1":8,0:9,1:10,2:11,3:12,4:14,5:15,6:17,7:18,8:19,9:21,10:22,11:24,12:25,13:26,14:28,15:29,16:30,17:32,18:33,19:35,20:36,21:38,22:39,23:40,24:42}),Object(gt.a)(Me,P.MODERATE,{"-1":5,0:6,1:7,2:8,3:9,4:11,5:12,6:14,7:15,8:16,9:18,10:19,11:21,12:22,13:23,14:25,15:26,16:28,17:29,18:30,19:32,20:33,21:35,22:36,23:37,24:38}),Object(gt.a)(Me,P.LOW,{"-1":2,0:3,1:4,2:5,3:6,4:8,5:9,6:11,7:12,8:13,9:15,10:16,11:18,12:19,13:20,14:22,15:23,16:25,17:26,18:27,19:29,20:30,21:32,22:33,23:34,24:36}),Object(gt.a)(Me,P.TERRIBLE,{"-1":0,0:1,1:2,2:3,3:4,4:6,5:7,6:8,7:10,8:11,9:12,10:14,11:15,12:16,13:18,14:19,15:20,16:22,17:23,18:24,19:26,20:27,21:28,22:30,23:31,24:32}),Me);var va=function(e,t,a,n,r,i,c){e=n?e.persistent:e.normal;var s=function(e,t,a){if(0===a)return[0,[1]];if(1===a)return[e,Object(mt.a)(t)];var n,r=[0],i=0,c=Math.floor(e*a),s=0,l=c,d=Object(pt.a)(t);try{for(d.s();!(n=d.n()).done;){var o=n.value,u=Math.floor((e+s)*a);if(u===l)r[i]+=o;else{if(u>l+1)for(var p=0;p<u-(l+1);p++)r[++i]=0;r[++i]=o}l=u,s++}}catch(m){d.e(m)}finally{d.f()}return[c,r]}(r,i,c),l=Object(d.a)(s,2);r=l[0],i=l[1],t in e?(e[t].staticDamage+=r,e[t].damageDist=ft(e[t].damageDist,i),a!==X.NONE&&(e[t].material=a)):e[t]={material:a,staticDamage:r,damageDist:i}};function ga(e,t){var a=[];switch(e){case F.ALWAYS:a=[0,1,2,3];break;case F.AT_LEAST_FAIL:a=[0,1,2];break;case F.AT_LEAST_SUCC:a=[0,1];break;case F.CRIF:a=[3];break;case F.CRIT:a=[0];break;case F.FAIL:a=[2];break;case F.FAIL_WORSE:a=[2,3];break;case F.SUCC:a=[1];break;case F.SUCC_WORSE:a=[1,2,3]}return a.includes(t)}for(var ha=function(){function e(t,a,n,r,i){Object(ot.a)(this,e),this.activityPaths=t,this.targets=a,this.damages=n,this.effects=r,this.weaknesses=i}return Object(ut.a)(e,[{key:"canEvaluate",value:function(e){var t=this.targets[0].levelDiff;return!(e+t<-1||e+t>24)}},{key:"evalRoutine",value:function(e,t,a,n){for(var r={flatfooted:!1,frightened:0},i=[],c=[],s=[],l=[],o=0,u=0,p=[1],m=[1],f=0;f<e.apIds.length;f++){var E=this.activityPaths[e.apIds[f]],v=this.evalPath(E,r,t,a,n),g=Object(d.a)(v,2),h=g[0],A=g[1];p=ft(p,h),m=ft(m,A)}for(var b=1,O=0;O<p.length;O++)i.push(O),c.push(b),b-=p[O],o+=p[O]*O;b=1;for(var y=0;y<m.length;y++)s.push(y),l.push(b),b-=m[y],u+=m[y]*y;return{expD:o,expP:u,dataArray:i,routineDDist:p,cumulative:c,PdataArray:s,routinePDDist:m,Pcumulative:l}}},{key:"evalPath",value:function(e,t,a,n,r){for(var i=this,c=this.targets[0],s=e.damages.map((function(e){return i.damages[e]})),l=e.effects.map((function(e){return i.effects[e]})),o=c.weaknesses.map((function(e){return i.weaknesses[e]})),u=function(e,t,a,n,r,i,c,s){var l,o,u;switch(t.targetType){case B.AC:u=fa[n.ACTrend];break;case B.FORT:u=Ea[n.FortTrend];break;case B.REF:u=Ea[n.RefTrend];break;case B.WILL:u=Ea[n.WillTrend];break;case B.PER:u=Ea[n.PerTrend];break;default:u=fa[n.ACTrend]}switch(u=u[e+n.levelDiff],t.type){case W.STRIKE:l=ta[t.profTrend][e],l+=aa[t.statTrend][e],l+=na[t.itemTrend][e],l+=t.bonusAdjustments[e],l+=ra[t.MAP],o=u+c-r.frightened,t.targetType===B.AC?(n.flatfooted||r.flatfooted)&&(o-=2):o+=10;break;case W.SAVE:l=u+c-r.frightened,o=10+ta[t.profTrend][e],o+=aa[t.statTrend][e],o+=na[t.itemTrend][e],o+=t.bonusAdjustments[e],t.targetType===B.AC&&(l-=10);break;default:console.log("Activity type ".concat(t.type," not implemented"))}var p=function(e,t){var a=e-t;return a<-20?0:-20===a?5:a<-9?arguments.length>2&&void 0!==arguments[2]&&arguments[2]?10:5:a<8?5*(11+a):95}(l,o),m=function(e,t){var a=e-t;return a<-29?0:a<-20?5:-20===a?0:a<-9?5*(arguments.length>2&&void 0!==arguments[2]&&arguments[2]?19:20+a):a<-1?50:a<9?5*(8-a):5}(l,o),f=function(e,t){var a=e-t;return a<-29?5:a<-20?5*(29+a):a<-10?45:a<-1?5*(-2-a):a<9?5:0}(l,o),E=function(e,t){var a=e-t;return a<-29?95:a<-10?5*(-10-a):a<-1?5:0}(l,o);if(t.rollType===M.ADVANTAGE){var v=100-p,g=v-m,h=g-f;f=100-h*h/100-(m=100-g*g/100-(p=100-v*v/100))-p,E=E*E/100}else if(t.rollType===M.DISADVANTAGE){var A=100-E,b=A-f,O=b-m;m=100-O*O/100-(f=100-b*b/100-(E=100-A*A/100))-E,p=p*p/100}var y=[p/100,m/100,f/100,E/100],T={normal:{},persistent:{}},I={normal:{},persistent:{}},C={normal:{},persistent:{}},x={normal:{},persistent:{}},R=[T,I,C,x];a.forEach((function(t){var a=t.damageCondition,n=t.diceSize,r=t.damageType,i=t.material,c=t.persistent,s=t.multiplier,l=ca[t.dieTrend][e];(l+=t.dieAdjustments[e])<0&&(l=0);var d=ia[t.damageTrend][e];d+=t.damageAdjustments[e];for(var o=[1],u=[],p=0;p<n;p++)u.push(1/n);for(var m=0;m<l;m++)o=ft(o,u);switch(d+=l,a){case V.STRIKE:va(I,r,i,c,d,o,1*s),va(T,r,i,c,d,o,2*s);break;case V.BASIC:va(I,r,i,c,d,o,.5*s),va(C,r,i,c,d,o,1*s),va(x,r,i,c,d,o,2*s);break;case V.CRIF:va(x,r,i,c,d,o,1*s);break;case V.FAIL:va(C,r,i,c,d,o,1*s);break;case V.SUCC:va(I,r,i,c,d,o,1*s);break;case V.CRIT:va(T,r,i,c,d,o,1*s);break;case V.AT_LEAST_SUCC:va(I,r,i,c,d,o,1*s),va(T,r,i,c,d,o,1*s);break;case V.AT_LEAST_FAIL:va(C,r,i,c,d,o,1*s),va(I,r,i,c,d,o,1*s),va(T,r,i,c,d,o,1*s);break;case V.FAIL_WORSE:va(x,r,i,c,d,o,1*s),va(C,r,i,c,d,o,1*s);break;case V.SUCC_WORSE:va(x,r,i,c,d,o,1*s),va(C,r,i,c,d,o,1*s),va(I,r,i,c,d,o,1*s);break;case V.ALWAYS:va(x,r,i,c,d,o,1*s),va(C,r,i,c,d,o,1*s),va(I,r,i,c,d,o,1*s),va(T,r,i,c,d,o,1*s);break;default:console.log("Damage condition ".concat(t.condition," not implemented yet."))}}));for(var S=0,N=R;S<N.length;S++)for(var j=N[S],D=0,L=["normal","persistent"];D<L.length;D++){var k=L[D],P=0,F=[1],w=function(e){var t=j[k][e],a=t.material,n=t.staticDamage,r=t.damageDist;if(1===r.length&&n<=0)return"continue";var c=vt(n,r,1),l=Object(d.a)(c,2);n=l[0],r=l[1];var o=0,u=0;i.forEach((function(t){t.type!==e&&t.type!==a||(t.value+s<0?o=Math.min(o,t.value+s):t.value+s>0&&(u=Math.max(u,t.value+s)))}));var p=vt(n-=u+o,r,0),m=Object(d.a)(p,2);n=m[0],r=m[1],P+=n,F=ft(F,r)};for(var G in j[k])w(G);j[k].staticDamage=P,j[k].damageDist=F}return[R,y]}(a,e,s,c,t,o,n,r),p=Object(d.a)(u,2),m=p[0],f=p[1],E=[t,t,t,t],v=function(e){l.forEach((function(t){var n=t.effectCondition,r=t.effectType,i=t.startLevel,c=t.endLevel;if(!(a<i||a>c)&&ga(n,e))switch(r){case J.FLATFOOT:!0!==E[e].flatfooted&&(E[e]=Object(te.a)(Object(te.a)({},E[e]),{},{flatfooted:!0}));break;case J.FRIGHTENED1:E[e].frightened<1&&(E[e]=Object(te.a)(Object(te.a)({},E[e]),{},{frightened:1}));break;case J.FRIGHTENED2:E[e].frightened<2&&(E[e]=Object(te.a)(Object(te.a)({},E[e]),{},{frightened:2}));break;case J.FRIGHTENED3:E[e].frightened<3&&(E[e]=Object(te.a)(Object(te.a)({},E[e]),{},{frightened:3}));break;case J.FRIGHTENED4:E[e].frightened<4&&(E[e]=Object(te.a)(Object(te.a)({},E[e]),{},{frightened:4}));break;default:console.log("Effect type ".concat(r," not implemented"))}}))},g=0;g<4;g++)v(g);return e.apIds.forEach((function(e){for(var t=i.activityPaths[e],c=new Map,s=0;s<4;s++)if(ga(t.condition,s)){if(c.has(E[s]));else{var l=i.evalPath(t,E[s],a,n,r),o=Object(d.a)(l,2),u=o[0],p=o[1];c.set(E[s],{pathDist:u,pathPDist:p})}m[s].normal.damageDist=ft(m[s].normal.damageDist,c.get(E[s]).pathDist),m[s].persistent.damageDist=ft(m[s].persistent.damageDist,c.get(E[s]).pathPDist)}})),[Et([m[0].normal,f[0]],[m[1].normal,f[1]],[m[2].normal,f[2]],[m[3].normal,f[3]]),Et([m[0].persistent,f[0]],[m[1].persistent,f[1]],[m[2].persistent,f[2]],[m[3].persistent,f[3]])]}}]),e}(),Aa=a(21),ba=a.n(Aa),Oa=a(22),ya=a.n(Oa)()(ba.a),Ta=function(e,t){var a=[],n=[];for(var r in e){var i=e[r];if(i.display){for(var c=[],s=[],l=[],d=1;d<=20;d++)if(t.canEvaluate(d)){c.push(d);var o=t.evalRoutine(i,d,0,0),u=o.expD,p=o.expP;s.push(u),l.push(p)}a.push({type:"scatter",name:i.name,x:c,y:s,yaxis:"y"}),n.push({type:"scatter",name:i.name,x:c,y:l,yaxis:"y"})}}return{datasets:a,perDatasets:n}},Ia=function(e,t,a){var n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=[],c=[],s=[],l=[];if(!t.canEvaluate(a))return{expectedDamages:s,expectedPersistentDamages:l,datasets:i,perDatasets:c};for(var d in e){var o=e[d];if(o.display){for(var u=[],p=[],m=[],f=-5;f<=5;f++){u.push(f);var E=t.evalRoutine(o,a,n?f:0,n?0:f),v=E.expD,g=E.expP;0===f&&(s.push(r.a.createElement("div",{key:o.id},o.name,": ",v.toFixed(2))),l.push(r.a.createElement("div",{key:o.id},o.name,": ",g.toFixed(2)))),p.push(v),m.push(g)}i.push({type:"scatter",name:o.name,x:u,y:p,yaxis:"y"}),c.push({type:"scatter",name:o.name,x:u,y:m,yaxis:"y"})}}return{expectedDamages:s,expectedPersistentDamages:l,datasets:i,perDatasets:c}},Ca=function(e,t,a){var n=[],i=[],c=[],s=[];if(!t.canEvaluate(a))return{expectedDamages:c,expectedPersistentDamages:s,datasets:n,perDatasets:i};for(var l in e){var d=e[l];if(d.display){var o=t.evalRoutine(d,a,0,0),u=o.expD,p=o.expP,m=o.dataArray,f=o.routineDDist,E=o.cumulative,v=o.PdataArray,g=o.routinePDDist,h=o.Pcumulative;c.push(r.a.createElement("div",{key:d.id},d.name,": ",u.toFixed(2))),s.push(r.a.createElement("div",{key:d.id},d.name,": ",p.toFixed(2))),n.push({type:"scatter",name:d.name,x:m,y:E,yaxis:"y"}),n.push({type:"bar",name:u.toFixed(2),x:m,y:f}),i.push({type:"scatter",name:d.name,x:v,y:h}),i.push({type:"bar",name:p.toFixed(2),x:v,y:g})}}return{expectedDamages:c,expectedPersistentDamages:s,datasets:n,perDatasets:i}},xa=function(e,t){var a,n,i,c,s=Object(o.c)(st),l=Object(o.c)(Xe),d=Object(o.c)(D),u=Object(o.c)(Ee),p=Object(o.c)(xe),m=Object(o.c)(y),f=new ha(l,d,u,p,m),E=d[0],v="",g=E.name;switch(v+=" Vs ",v+=" AC: "+fa[E.ACTrend][t],v+=" Fort: "+Ea[E.FortTrend][t],v+=" Ref: "+Ea[E.RefTrend][t],v+=" Will: "+Ea[E.WillTrend][t],v+=" Per: "+Ea[E.PerTrend][t],e){case L.DISTRIBUTION:var h=Ca(s,f,t);i=h.expectedDamages,c=h.expectedPersistentDamages,a=h.datasets,n=h.perDatasets;break;case L.PMDEFENSE:var A=Ia(s,f,t,!0);i=A.expectedDamages,c=A.expectedPersistentDamages,a=A.datasets,n=A.perDatasets;break;case L.PMRES:var b=Ia(s,f,t,!1);i=b.expectedDamages,c=b.expectedPersistentDamages,a=b.datasets,n=b.perDatasets}var O,T,I=Ta(s,f),C=I.datasets,x=I.perDatasets;return e===L.DISTRIBUTION?(O="damage",T="chance"):e===L.PMDEFENSE?(O="+/- AC/Save Bonus",T="Expected Damage"):e===L.PMRES&&(O="+/- Resistance/Weakness",T="Expected Damage"),{expectedDamages:i,expectedPersistentDamages:c,damageChart:r.a.createElement(ya,{classname:"plot",data:a,layout:{title:v,autosize:!0,xaxis:{title:O},yaxis:{title:T},legend:{x:1,y:1,xanchor:"right"},margin:{l:40,r:40}},useResizeHandler:!0,style:{width:"100%",height:"100%"}}),persistentDamageChart:r.a.createElement(ya,{classname:"plot",data:n,layout:{title:"Expected Persistent Damage",autosize:!0,xaxis:{title:"persistent damage"},yaxis:{title:"chance"},legend:{x:1,y:1,xanchor:"right"},margin:{l:40,r:40}},useResizeHandler:!0,style:{width:"100%",height:"100%"}}),byLevelDamageChart:r.a.createElement(ya,{classname:"plot",data:C,layout:{title:g,autosize:!0,xaxis:{title:"Level"},yaxis:{title:"Expected Damage"},legend:{x:1,y:1,xanchor:"right"},margin:{l:40,r:40}},useResizeHandler:!0,style:{width:"100%",height:"100%"}}),byLevelPerDamageChart:r.a.createElement(ya,{classname:"plot",data:x,layout:{title:g,autosize:!0,xaxis:{title:"Level"},yaxis:{title:"Expected Persistent Damage"},legend:{x:1,y:1,xanchor:"right"},margin:{l:40,r:40}},useResizeHandler:!0,style:{width:"100%",height:"100%"}})}},Ra=function(){var e=Object(n.useState)(!1),t=Object(d.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)(L.DISTRIBUTION),s=Object(d.a)(c,2),l=s[0],o=s[1],u=Object(n.useState)(1),p=Object(d.a)(u,2),m=p[0],f=p[1],E=xa(l,m),v=E.expectedDamages,g=E.expectedPersistentDamages,h=E.damageChart,A=E.persistentDamageChart,b=E.byLevelDamageChart,O=E.byLevelPerDamageChart,y=[];for(var T in L)y.push(r.a.createElement("option",{key:T},L[T]));for(var I=[],C=1;C<=20;C++)I.push(r.a.createElement("option",{key:C,value:C},C));return r.a.createElement("div",{className:"box"},"Graph Type: ",r.a.createElement("select",{value:l,onChange:function(e){return o(e.target.value)}},y),l===L.BYLEVEL?"":r.a.createElement("select",{value:m,onChange:function(e){return f(parseInt(e.target.value))}},I)," Show persistent damage: ",r.a.createElement("input",{type:"checkbox",checked:a,onChange:function(e){return i(e.target.checked)}}),r.a.createElement("div",null,"Expected Damage:",v),h,b,a?r.a.createElement("div",null,r.a.createElement("div",null,"Expected Persistent Damage:",g),A,O):"")},Sa=[],Na=1;Na<=20;Na++)Sa.push(r.a.createElement("option",{key:Na},Na));var ja=[];for(var Da in F)ja.push(r.a.createElement("option",{key:Da},F[Da]));var La=[];for(var ka in M)La.push(r.a.createElement("option",{key:ka},M[ka]));var Pa=[];for(var Fa in W)Pa.push(r.a.createElement("option",{key:Fa},W[Fa]));var Ma=[];for(var Wa in w)Ma.push(r.a.createElement("option",{key:Wa},w[Wa]));var wa=[];for(var Ga in G)wa.push(r.a.createElement("option",{key:Ga},G[Ga]));var Ha=[];for(var Ua in H)Ha.push(r.a.createElement("option",{key:Ua},H[Ua]));var _a=[];for(var Ba in U)_a.push(r.a.createElement("option",{key:Ba},U[Ba]));var Va=[];for(var Ka in B)Va.push(r.a.createElement("option",{key:Ka},B[Ka]));var za=[];for(var Ya in V)za.push(r.a.createElement("option",{key:Ya},V[Ya]));var Xa=[];for(var Ja in z)Xa.push(r.a.createElement("option",{key:Ja},z[Ja]));var $a=[];for(var qa in{4:4,6:6,8:8,10:10,12:12})$a.push(r.a.createElement("option",{key:qa},qa));var Qa=[];for(var Za in K)Qa.push(r.a.createElement("option",{key:Za},K[Za]));var en=[];for(var tn in Y)en.push(r.a.createElement("option",{key:tn},Y[tn]));var an=[];for(var nn in X)an.push(r.a.createElement("option",{key:nn},X[nn]));for(var rn=[],cn=0,sn=[.5,1,2];cn<sn.length;cn++){var ln=sn[cn];rn.push(r.a.createElement("option",{key:ln},ln))}var dn=[];for(var on in J)dn.push(r.a.createElement("option",{key:on},J[on]));var un=function(e){for(var t={},a=0,n=0,r=1;r<=20;r++)e[n]&&e[n][0]===r&&((a=e[n][1])||(a=0),n++),t[r]=a;return t},pn=function(e){var t=e.length>0?e[e.length-1]:[0,0];return e.push([t[0]+1,t[1]+1]),un(e)},mn=function(e,t,a,n,i){for(var c=function(e){for(var t=0,a=[],n=1;n<=20;n++)t!==e[n]&&(t=e[n],a.push([n,t]));return a}(i),s=[],l=function(i){s.push(r.a.createElement("span",{className:"input",key:i},"@",r.a.createElement("select",{value:c[i][0],onChange:function(r){return t(a({id:n,changes:Object(gt.a)({},e,(s=c,l=i,d=parseInt(r.target.value),s[l]=[d,s[l][1]],s.sort((function(e,t){return e[0]-t[0]})),un(s)))}));var s,l,d}},Sa),"+",r.a.createElement("input",{type:"number",value:c[i][1],onChange:function(r){return t(a({id:n,changes:Object(gt.a)({},e,(s=c,l=i,d=parseInt(r.target.value),s[l]=[s[l][0],d],un(s)))}));var s,l,d}})))},d=0;d<c.length;d++)l(d);return s.push(r.a.createElement("button",{key:"addButton",className:"add",onClick:function(){return t(a({id:n,changes:Object(gt.a)({},e,pn(c))}))}},"+")),s},fn=function(e){var t=e.parentId,a=e.id,n=Object(o.c)((function(e){return fe(e,a)})),i=n.damageCondition,c=n.damageType,s=n.material,l=n.persistent,d=n.multiplier,u=n.dieTrend,p=n.dieAdjustments,m=n.diceSize,f=n.damageTrend,E=n.damageAdjustments,v=Object(o.b)(),g=mn("dieAdjustments",v,ue,a,p),h=mn("damageAdjustments",v,ue,a,E);return r.a.createElement("div",{className:"box"},r.a.createElement("button",{className:"delete",onClick:function(e){v(le({id:a,parentId:t}))}},"-"),r.a.createElement("select",{value:i,onChange:function(e){return v(ue({id:a,changes:{damageCondition:e.target.value}}))}},za),": ",r.a.createElement("div",null,r.a.createElement("span",{className:"input"},"Dice: (",r.a.createElement("select",{value:u,onChange:function(e){return v(ue({id:a,changes:{dieTrend:e.target.value}}))}},Xa),"+",g,") d",r.a.createElement("select",{value:m,onChange:function(e){return v(ue({id:a,changes:{diceSize:parseInt(e.target.value)}}))}},$a)),r.a.createElement("div",null,r.a.createElement("span",{className:"input"},"Static: (",r.a.createElement("select",{value:f,onChange:function(e){return v(ue({id:a,changes:{damageTrend:e.target.value}}))}},Qa),"+",h,")"))),r.a.createElement("span",{className:"input"}," Type: ",r.a.createElement("select",{value:c,onChange:function(e){v(ue({id:a,changes:{damageType:e.target.value}}))}},en),r.a.createElement("select",{value:s,onChange:function(e){v(ue({id:a,changes:{material:e.target.value}}))}},an)," Persistent: ",r.a.createElement("input",{type:"checkbox",checked:l,onChange:function(e){return v(ue({id:a,changes:{persistent:e.target.checked}}))}}))," ",r.a.createElement("span",{className:"input"}," x ",r.a.createElement("select",{value:d,onChange:function(e){v(ue({id:a,changes:{multiplier:parseFloat(e.target.value)}}))}},rn)))},En=function(e){var t=e.parentId,a=e.id,n=Object(o.c)((function(e){return Ce(e,a)})),i=n.effectCondition,c=n.effectType,s=n.startLevel,l=n.endLevel,d=Object(o.b)();return r.a.createElement("div",{className:"box"},r.a.createElement("button",{className:"delete",onClick:function(e){d(ye({id:a,parentId:t}))}},"-"),r.a.createElement("select",{value:i,onChange:function(e){return d(be({id:a,changes:{effectCondition:e.target.value}}))}},ja),": ",r.a.createElement("select",{value:c,onChange:function(e){return d(be({id:a,changes:{effectType:e.target.value}}))}},dn),"@",r.a.createElement("select",{value:s,onChange:function(e){return d(be({id:a,changes:{startLevel:parseInt(e.target.value)}}))}},Sa),"to",r.a.createElement("select",{value:l,onChange:function(e){return d(be({id:a,changes:{endLevel:parseInt(e.target.value)}}))}},Sa))},vn=function e(t){var a=t.id,n=t.parentId,i=t.routineId,c=t.displayCondition,s=void 0===c||c,l=Object(o.c)((function(e){return Ye(e,a)})),d=l.condition,u=l.rollType,p=l.type,m=l.profTrend,f=l.statTrend,E=l.itemTrend,v=l.bonusAdjustments,g=l.MAP,h=l.targetType,A=l.damages,b=l.effects,O=l.apIds,y=Object(o.b)(),T=mn("bonusAdjustments",y,Be,a,v);return r.a.createElement("div",{className:"box"},s?r.a.createElement("div",null,"Condition: ",r.a.createElement("select",{value:d,onChange:function(e){return y(Be({id:a,changes:{condition:e.target.value}}))}},ja)):"",r.a.createElement("div",{className:""},r.a.createElement("div",{className:"flexbox"},r.a.createElement("button",{className:"delete",onClick:function(e){y(Ve({id:a,parentId:n,routineId:i}))}},"-"),r.a.createElement("span",{className:"input"},r.a.createElement("select",{value:u,onChange:function(e){y(Be({id:a,changes:{rollType:e.target.value}}))}},La)),r.a.createElement("span",{className:"input"},r.a.createElement("select",{value:p,onChange:function(e){return y(Be({id:a,changes:{type:e.target.value}}))}},Pa))," ",r.a.createElement("span",{className:"input"},p===W.SAVE?"DC: (10 + ":"Bonus: (",r.a.createElement("select",{value:m,onChange:function(e){return y(Be({id:a,changes:{profTrend:e.target.value}}))}},Ma),r.a.createElement("select",{value:f,onChange:function(e){return y(Be({id:a,changes:{statTrend:e.target.value}}))}},wa),r.a.createElement("select",{value:E,onChange:function(e){return y(Be({id:a,changes:{itemTrend:e.target.value}}))}},Ha),"+",T,")"),p===W.STRIKE?r.a.createElement("span",{className:"input"}," MAP: ",r.a.createElement("select",{value:g,onChange:function(e){return y(Be({id:a,changes:{MAP:e.target.value}}))}},_a)):"",r.a.createElement("span",{className:"input"}," VS: ",r.a.createElement("select",{value:h,onChange:function(e){y(Be({id:a,changes:{targetType:e.target.value}}))}},Va))),r.a.createElement("div",{className:"box"},"Damage: ",A.map((function(e){return r.a.createElement(fn,{parentId:a,id:e,key:e})})),r.a.createElement("button",{className:"add",onClick:function(){return y(de({parentId:a}))}},"+")),r.a.createElement("div",{className:"box"},"Effects: ",b.map((function(e){return r.a.createElement(En,{parentId:a,id:e,key:e})})),r.a.createElement("button",{className:"add",onClick:function(){return y(Oe({parentId:a}))}},"+"))),r.a.createElement("div",{className:"box"},O.map((function(t){return r.a.createElement(e,{id:t,parentId:a,key:t})})),r.a.createElement("button",{className:"add",onClick:function(){return y(Ue({parentId:a}))}},"+"),r.a.createElement("button",{className:"add",onClick:function(){return y(Ue({parentId:a,applyMAP:!0}))}},"+MAP")))};var gn=function(e){var t=e.id,a=Object(o.b)(),n=Object(o.c)((function(e){return ct(e,t)})).name;return r.a.createElement("div",{className:"box"},r.a.createElement("label",{htmlFor:"routineName"},"Routine Name:"),r.a.createElement("input",{id:"routineName",type:"text",placeholder:"Enter routine name",value:n,onChange:function(e){return a(at({id:t,changes:{name:e.target.value}}))}}))},hn=function(e){var t=e.routineId,a=Object(o.c)((function(e){return ct(e,t)})).apIds,n=Object(o.b)();return r.a.createElement("div",{className:"selectedRoutine"},r.a.createElement(gn,{id:t}),a.map((function(e){return r.a.createElement(vn,{id:e,routineId:t,key:e,displayCondition:!1})})),r.a.createElement("button",{className:"add",onClick:function(){return n(Ue({routineId:t}))}},"+"))},An=function(){var e=Object(o.c)(lt),t=Object(o.c)(dt),a=Object(o.b)(),n=[],i=[];return e.forEach((function(e){n.push(r.a.createElement("option",{value:e.id,key:e.id},e.name)),i.push(r.a.createElement("div",{className:"flexbox",key:e.id},r.a.createElement("button",{className:"remove",onClick:function(){return a(nt(e.id))}},"-"),r.a.createElement("span",{className:e.display?"routineOn":"routineOff",onClick:function(){return a(at({id:e.id,changes:{display:!e.display}}))}},e.name)))})),r.a.createElement("div",{className:"box"},"Selected Routine:",r.a.createElement("select",{value:t,onChange:function(e){return a(et(e.target.value))}},n),r.a.createElement("button",{className:"add",onClick:function(){return a(Ze())}},"+"),r.a.createElement("div",{className:"routines"},i))},bn=function(){return r.a.createElement("div",{className:"box"},"Import and Export Here")};a(36);l.a.initialize("G-JR2YK097BG");var On=function(e){var t=Object(o.c)(dt);return l.a.send("pageview"),r.a.createElement("div",{className:"PF2App"},r.a.createElement(ee,{id:0}),r.a.createElement(Ra,null),r.a.createElement(An,null),void 0!==t?r.a.createElement(hn,{routineId:t}):"",r.a.createElement(bn,null))},yn=Object(u.a)({reducer:{routines:rt,activityPaths:Ke,damages:pe,effects:Te,weaknesses:A,targets:S}});yn.dispatch(tt({id:0,name:"Martial",display:!0,apIds:[0]}));for(var Tn={},In=1;In<=20;In++)Tn[In]=0;yn.dispatch(_e({id:0,condition:F.ALWAYS,rollType:M.NORMAL,type:W.STRIKE,profTrend:w.MARTIALWEAPON,statTrend:G.AS18a,itemTrend:H.WEAPON,bonusAdjustments:Object(te.a)({},Tn),MAP:U.N1,targetType:B.AC,targetInfoId:0,damages:[0],effects:[],apIds:[]})),yn.dispatch(oe({id:0,damageCondition:V.STRIKE,damageType:Y.S,material:X.NONE,persistent:!1,multiplier:1,dieTrend:z.WEAPON,dieAdjustments:Object(te.a)({},Tn),diceSize:8,damageTrend:K.MARTIALMELEE,damageAdjustments:Object(te.a)({},Tn)})),yn.dispatch(x({id:0,name:"Custom Target",levelDiff:0,ACTrend:k.HIGH,FortTrend:P.MODERATE,RefTrend:P.MODERATE,WillTrend:P.MODERATE,PerTrend:P.MODERATE,flatfooted:!1,weaknesses:[]}));var Cn=yn;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(o.a,{store:Cn},r.a.createElement(On,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.89ffa5ea.chunk.js.map