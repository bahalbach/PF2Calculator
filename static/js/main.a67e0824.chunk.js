(this.webpackJsonppf2=this.webpackJsonppf2||[]).push([[0],{17:function(e,t,n){e.exports=n(25)},22:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),i=n(15),r=n.n(i),c=(n(22),n(6)),s=n(4),u=n(1),o=n(2),h=n(3),f=n(9),v=n(11),d=n(13),m=n.n(d);function g(e){return l.a.createElement("label",{className:"CheckboxInput"},l.a.createElement("input",{type:"checkbox",checked:e.checked,onChange:e.onChange}),e.label)}var p=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={collapseView:!0},a.handleClick=a.handleClick.bind(Object(h.a)(a)),a}return Object(o.a)(n,[{key:"handleClick",value:function(e){this.setState({collapseView:!this.state.collapseView})}},{key:"render",value:function(){return l.a.createElement("div",{className:"CollapsableInput"},l.a.createElement("div",{className:this.state.collapseView?"Description CollapsableInputDescription Collapsed":"Description CollapsableInputDescription Open",onClick:this.handleClick},this.props.description),this.state.collapseView?"":this.props.listInput,this.props.after)}}]),n}(l.a.Component);function E(e){for(var t=[],n=1;n<=20;n++)t.push(l.a.createElement("div",{key:n},l.a.createElement("label",null," Level ",n,": ",l.a.createElement("input",{type:"number",value:e.modifier.get(n),onChange:e.onChange.bind(null,n)}))));return t}function y(e){for(var t=e.modifier.getByLevelEntries(),n=[],a=0;a<t.length;a++)n.push(l.a.createElement("div",{key:a},l.a.createElement(b,{value:t[a][0],onChange:e.onChange.bind(null,a,"EntryLevel")}),l.a.createElement("input",{type:"number",value:t[a][1],onChange:e.onChange.bind(null,a,"EntryValue")})));return n.push(l.a.createElement("div",{key:t.length},l.a.createElement(b,{value:"never",onChange:e.onChange.bind(null,t.length,"EntryLevel")}),l.a.createElement("input",{type:"number",value:e.modifier.extra,onChange:e.onChange.bind(null,t.length,"EntryValue")}))),n}function C(e){return l.a.createElement("div",null,l.a.createElement("label",null," ",e.name+": ",l.a.createElement(b,{value:e.value,onChange:e.onChange})))}function b(e){return l.a.createElement("select",{value:e.value,onChange:e.onChange},l.a.createElement("option",{value:"never"},"Never"),l.a.createElement("option",{value:"1"},"1"),l.a.createElement("option",{value:"2"},"2"),l.a.createElement("option",{value:"3"},"3"),l.a.createElement("option",{value:"4"},"4"),l.a.createElement("option",{value:"5"},"5"),l.a.createElement("option",{value:"6"},"6"),l.a.createElement("option",{value:"7"},"7"),l.a.createElement("option",{value:"8"},"8"),l.a.createElement("option",{value:"9"},"9"),l.a.createElement("option",{value:"10"},"10"),l.a.createElement("option",{value:"11"},"11"),l.a.createElement("option",{value:"12"},"12"),l.a.createElement("option",{value:"13"},"13"),l.a.createElement("option",{value:"14"},"14"),l.a.createElement("option",{value:"15"},"15"),l.a.createElement("option",{value:"16"},"16"),l.a.createElement("option",{value:"17"},"17"),l.a.createElement("option",{value:"18"},"18"),l.a.createElement("option",{value:"19"},"19"),l.a.createElement("option",{value:"20"},"20"))}var k=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];Object(u.a)(this,e),this.value=t}return Object(o.a)(e,[{key:"isTrue",value:function(){return this.value}},{key:"createUpdated",value:function(t){return new e(t.target.checked)}}]),e}(),P=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-5,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-4;if(Object(u.a)(this,e),this.prevAttacks=t,this.initial=n,this.changeLevel=a,this.changed=l,this.value=new Array(20).fill(t*n),null!==a)for(var i=a;i<=20;i++)this.value[i-1]=t*l}return Object(o.a)(e,[{key:"get",value:function(e){return this.value[e-1]}},{key:"getPrevAttacks",value:function(){return this.prevAttacks}},{key:"getInitial",value:function(){return this.initial}},{key:"getChanged",value:function(){return this.changed}},{key:"getDescription",value:function(e){return e?"("+this.get(e)+")":""}},{key:"createUpdated",value:function(t,n){switch(t){case"prevAttacks":return new e(parseInt(n.target.value),this.initial,this.changeLevel,this.changed);case"initial":return new e(this.prevAttacks,parseInt(n.target.value),this.changeLevel,parseInt(n.target.value)+1);case"changeLevel":return"never"===n.target.value?new e(this.prevAttacks,this.initial,null,this.changed):new e(this.prevAttacks,this.initial,parseInt(n.target.value),this.changed);case"changed":return new e(this.prevAttacks,Math.max(parseInt(n.target.value)-1,-5),this.changeLevel,parseInt(n.target.value));default:return new e}}}]),e}(),I=n(12),A=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;Object(u.a)(this,e),this.proficiencies=[t,n,a,l,i];var r=0;n&&1===n&&(r=1,a&&1===a&&(r=2,l&&1===l&&(r=3,i&&1===i&&(r=4)))),this.initial=r,this.values=[],this.profArray=[];for(var c=0;c<20;c++){for(;this.proficiencies[r+1]&&this.proficiencies[r+1]===c+1;)r++;0===r?(this.values.push(0),this.profArray.push(0)):(this.values.push(c+1+2*r),this.profArray.push(r))}this.maxProf=r,this.usedProficiencies=[];for(var s=this.initial;s<=this.maxProf;s++)this.usedProficiencies.push(s)}return Object(o.a)(e,[{key:"get",value:function(e){return this.values[e-1]}},{key:"getProf",value:function(e){return this.profArray[e-1]}},{key:"getInitial",value:function(){return this.initial}},{key:"getMax",value:function(){return this.maxProf}},{key:"getLevelAcquired",value:function(e){return this.proficiencies[e]}},{key:"getProficiencies",value:function(){return this.usedProficiencies}},{key:"isFighter",value:function(){return this.proficiencies.every((function(e,t){return e===[1,1,1,5,13][t]}))}},{key:"isMartial",value:function(){return this.proficiencies.every((function(e,t){return e===[1,1,5,13,null][t]}))}},{key:"isCaster",value:function(){return this.proficiencies.every((function(e,t){return e===[1,1,11,null,null][t]}))}},{key:"isAlchemist",value:function(){return this.proficiencies.every((function(e,t){return e===[1,1,7,null,null][t]}))}},{key:"getDescription",value:function(t){var n=" ";t&&(n+="("+this.get(t)+") "),n+=e.toName(this.getInitial())+" 1";for(var a=this.getInitial()+1;a<=this.getMax();a++)n+=", "+e.toName(a)+" "+this.getLevelAcquired(a);return n}},{key:"createUpdated",value:function(t,n){switch(t){case"initial":return e.newProficiencyWithIntial(n.target.value,this);case"fighter":return new e(1,1,1,5,13);case"martial":return new e(1,1,5,13,null);case"caster":return new e(1,1,11,null,null);case"alchemist":return new e(1,1,7,null,null);default:return e.newProficiencyWithChangedLevel(t,parseInt(n.target.value),this)}}}],[{key:"toName",value:function(e){return["Untrained","Trained","Expert","Master","Legendary"][e]}},{key:"newProficiencyWithIntial",value:function(t,n){for(var a=[1,null,null,null,null],l=t-n.usedProficiencies[0],i=0;i<a.length;i++)if(i<=t)a[i]=1;else{var r=n.usedProficiencies[i-t],c=n.getLevelAcquired(r);a[r+l]=c}return new e(a[0],a[1],a[2],a[3],a[4])}},{key:"newProficiencyWithChangedLevel",value:function(t,n,a){var l=a.proficiencies.slice();return l[t]=n,Object(s.a)(e,Object(I.a)(l))}}]),e}(),L=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[!1,!1,!1,!1],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object(u.a)(this,e),this.initial=t,this.boosts=n,this.apexLevel=a,this.scoreArray=[t];for(var l,i=t,r=2;r<=20;r++)(5===r&&n[0]||10===r&&n[1]||15===r&&n[2]||20===r&&n[3])&&(i+=i<18?2:1),l=a&&r>=a?Math.max(18,i+2):i,this.scoreArray.push(l);this.maxScore=l}return Object(o.a)(e,[{key:"get",value:function(e){return this.scoreArray[e-1]}},{key:"getMod",value:function(e){return parseInt((this.scoreArray[e-1]-10)/2)}},{key:"getInitial",value:function(){return this.initial}},{key:"getBoosts",value:function(){return this.boosts}},{key:"getApexLevel",value:function(){return this.apexLevel}},{key:"getScores",value:function(){return[this.initial].concat(Object(I.a)(this.boosts),[this.apexLevel])}},{key:"is18a",value:function(){return 18===this.initial&&(!0===this.boosts[0]&&(!0===this.boosts[1]&&(!0===this.boosts[2]&&(!0===this.boosts[3]&&17===this.apexLevel))))}},{key:"is16a",value:function(){return 16===this.initial&&(!0===this.boosts[0]&&(!0===this.boosts[1]&&(!0===this.boosts[2]&&17===this.apexLevel)))}},{key:"is16pp",value:function(){return 16===this.initial&&(!0===this.boosts[0]&&(!0===this.boosts[1]&&(!0===this.boosts[2]&&null===this.apexLevel)))}},{key:"is14p",value:function(){return 14===this.initial&&(!0===this.boosts[0]&&(!0===this.boosts[1]&&(!1===this.boosts[2]&&(!1===this.boosts[3]&&null===this.apexLevel))))}},{key:"is10",value:function(){return 10===this.initial&&(!1===this.boosts[0]&&(!1===this.boosts[1]&&(!1===this.boosts[2]&&(!1===this.boosts[3]&&null===this.apexLevel))))}},{key:"getDescription",value:function(e){var t=" ";return e&&(t+="("+this.getMod(e)+") "),t+=this.initial+" to "+this.maxScore}},{key:"createUpdated",value:function(t,n){var a=this.initial,l=this.boosts.slice(),i=this.apexLevel;switch(t){case"18a":return new e(18,[!0,!0,!0,!0],17);case"16a":return new e(16,[!0,!0,!0,!1],17);case"16++":return new e(16,[!0,!0,!0,!1],null);case"14+":return new e(14,[!0,!0,!1,!1],null);case"10":return new e(10,[!1,!1,!1,!1],null);case"initial":a=parseInt(n.target.value);break;case 0:case 1:case 2:case 3:l[t]=n.target.checked;break;case"apex":var r=n.target.value;"never"===r&&(r=null),i=r;break;default:console.error("Unhandled ability score")}return new e(a,l,i)}}]),e}(),w=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;Object(u.a)(this,e),null===t?(this.values=new Array(20).fill(0),this.entries=[[1,0]],this.extra=0):(this.values=t,this.generateEntries(),this.extra=0)}return Object(o.a)(e,[{key:"get",value:function(e){return this.values[e-1]}},{key:"is",value:function(e){for(var t=0;t<20;t++)if(this.values[t]!==e)return!1;return!0}},{key:"generateEntries",value:function(){var e=this.values[0];this.entries=[[1,e]];for(var t=2;t<=20;t++)e!==this.values[t-1]&&(e=this.values[t-1],this.entries.push([t,e]))}},{key:"getByLevelEntries",value:function(){return this.entries}},{key:"fromChangedEntryLevel",value:function(e,t){if(e===this.entries.length){for(var n=0;n<=this.entries.length;n++)if(n===this.entries.length||this.entries[n][0]>t){this.entries.splice(n,0,[t,this.extra]);break}}else this.entries[e][0]=t;return this.newModifierFromEntries(this.entries,this.extra)}},{key:"fromChangedEntryValue",value:function(e,t){return e===this.entries.length?this.extra=t:this.entries[e][1]=t,this.newModifierFromEntries(this.entries,this.extra)}},{key:"newModifierFromEntries",value:function(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=[],l=0,i=0,r=1;r<=20;r++)t[i]&&t[i][0]===r&&((l=t[i][1])||(l=0),i++),a.push(l);var c=new e(a);return c.extra=n,c}},{key:"getDescription",value:function(e){var t=" ";return e&&(t+="("+this.get(e)+") "),t+=this.values[0]+" to "+this.values[19]}},{key:"createUpdated",value:function(t,n,a){var l;switch(t){case"EntryLevel":return this.fromChangedEntryLevel(a,parseInt(n.target.value));case"EntryValue":return this.fromChangedEntryValue(a,parseInt(n.target.value));case"0":l=new Array(20).fill(0);break;case"+1":case"-1":l=new Array(20).fill(1);break;case"+2":case"-2":l=new Array(20).fill(2);break;case"+3":case"-3":l=new Array(20).fill(3);break;case"+4":case"-4":l=new Array(20).fill(4);break;case"WSMartial":l=new Array(20).fill(0);for(var i=7;i<=20;i++)i<15&&(l[i-1]=1),i>=15&&(l[i-1]=2);break;case"WSCaster":l=new Array(20).fill(0);for(var r=13;r<=20;r++)l[r-1]=1;break;case"d4":l=new Array(20).fill(4);break;case"d6":l=new Array(20).fill(6);break;case"d8":l=new Array(20).fill(8);break;case"d10":l=new Array(20).fill(10);break;case"d12":l=new Array(20).fill(12);break;case"None":l=new Array(20).fill(0);break;case"ABPWeaponBonus":l=new Array(20).fill(0);for(var c=0;c<20;c++)c+1>=16?l[c]=3:c+1>=10?l[c]=2:c+1>=2&&(l[c]=1);break;case"ABPSkill1":l=new Array(20).fill(0);for(var s=0;s<20;s++)s+1>=17?l[s]=3:s+1>=9?l[s]=2:s+1>=3&&(l[s]=1);break;case"ABPSkill2":l=new Array(20).fill(0);for(var u=0;u<20;u++)u+1>=20?l[u]=3:u+1>=13?l[u]=2:u+1>=6&&(l[u]=1);break;case"One":l=new Array(20).fill(1);break;case"ABPWeaponDiceNum":l=new Array(20).fill(1);for(var o=0;o<20;o++)o+1>=19?l[o]=4:o+1>=12?l[o]=3:o+1>=4&&(l[o]=2);break;default:(l=this.values.slice())[t-1]=parseInt(n.target.value)}return new e(l)}},{key:"isWSMartial",value:function(){for(var e=1;e<=20;e++){if(e<7&&0!==this.values[e-1])return!1;if(e>=7&&e<15&&1!==this.values[e-1])return!1;if(e>=15&&2!==this.values[e-1])return!1}return!0}},{key:"isWSCaster",value:function(){for(var e=1;e<=20;e++){if(e<13&&0!==this.values[e-1])return!1;if(e>=13&&1!==this.values[e-1])return!1}return!0}},{key:"isABPWeaponDiceNum",value:function(){for(var e=0;e<20;e++)if(e+1>=19){if(4!==this.values[e])return!1}else if(e+1>=12){if(3!==this.values[e])return!1}else if(e+1>=4){if(2!==this.values[e])return!1}else if(1!==this.values[e])return!1;return!0}},{key:"getDieSizeDescription",value:function(e){var t=" ";return e&&(t+="(d"+this.get(e)+") "),t+="d"+this.values[0]+" to d"+this.values[19]}},{key:"isd4",value:function(){for(var e=0;e<20;e++)if(4!==this.values[e])return!1;return!0}},{key:"isd6",value:function(){for(var e=0;e<20;e++)if(6!==this.values[e])return!1;return!0}},{key:"isd8",value:function(){for(var e=0;e<20;e++)if(8!==this.values[e])return!1;return!0}},{key:"isd10",value:function(){for(var e=0;e<20;e++)if(10!==this.values[e])return!1;return!0}},{key:"isd12",value:function(){for(var e=0;e<20;e++)if(12!==this.values[e])return!1;return!0}},{key:"isNone",value:function(){for(var e=0;e<20;e++)if(0!==this.values[e])return!1;return!0}},{key:"isABPWeaponBonus",value:function(){for(var e=0;e<20;e++)if(e+1>=16){if(3!==this.values[e])return!1}else if(e+1>=10){if(2!==this.values[e])return!1}else if(e+1>=2){if(1!==this.values[e])return!1}else if(0!==this.values[e])return!1;return!0}},{key:"isABPSkill1",value:function(){for(var e=0;e<20;e++)if(e+1>=17){if(3!==this.values[e])return!1}else if(e+1>=9){if(2!==this.values[e])return!1}else if(e+1>=3){if(1!==this.values[e])return!1}else if(0!==this.values[e])return!1;return!0}},{key:"isABPSkill2",value:function(){for(var e=0;e<20;e++)if(e+1>=20){if(3!==this.values[e])return!1}else if(e+1>=13){if(2!==this.values[e])return!1}else if(e+1>=6){if(1!==this.values[e])return!1}else if(0!==this.values[e])return!1;return!0}}]),e}(),N=n(16),S=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;Object(u.a)(this,e),this.length=t.length,this.effectEntries=t,this.extraLevelAdded=n,this.extraLevelRemoved=a}return Object(o.a)(e,[{key:"getName",value:function(e){return e===this.length?"None":this.effectEntries[e][0]}},{key:"getLevelAdded",value:function(e){return e===this.length?this.extraLevelAdded:this.effectEntries[e][1]}},{key:"getLevelRemoved",value:function(e){return e===this.length?this.extraLevelRemoved:this.effectEntries[e][2]}},{key:"getDescription",value:function(){for(var e=new Set,t="Runes: ",n=0;n<this.length;n++)e.add(this.effectEntries[n][0]);var a,l=Object(N.a)(e);try{for(l.s();!(a=l.n()).done;){t+=" "+a.value}}catch(i){l.e(i)}finally{l.f()}return t}},{key:"fromUpdateEntryEffect",value:function(t,n){var a=this.effectEntries.slice();return t===this.length?(console.log("here"),a.push([n,this.extraLevelAdded,this.extraLevelRemoved])):"None"===n?a.splice(t,1):a[t][0]=n,new e(a,this.extraLevelAdded,this.extraLevelRemoved)}},{key:"fromUpdateEntryLevelAdded",value:function(t,n){var a=this.effectEntries.slice();return n||(n=0),t===this.length?this.extraLevelAdded=n:a[t][1]=n,new e(a,this.extraLevelAdded,this.extraLevelRemoved)}},{key:"fromUpdateEntryLevelRemoved",value:function(t,n){var a=this.effectEntries.slice();return n||(n=0),t===this.length?this.extraLevelRemoved=n:a[t][2]=n,new e(a,this.extraLevelAdded,this.extraLevelRemoved)}},{key:"createUpdated",value:function(t,n,a){switch(t){case"EntryName":return this.fromUpdateEntryEffect(a,n.target.value);case"LevelAdded":return this.fromUpdateEntryLevelAdded(a,parseInt(n.target.value));case"LevelRemoved":return this.fromUpdateEntryLevelRemoved(a,parseInt(n.target.value));default:return new e}}}]),e}();function B(e,t){var n="";return t&&(n+="("+M(e,t)+") "),n+=M(e,1)+" to "+M(e,20)}function x(e,t){var n="";return t&&(n+="("+O(e,t)+") "),n+=O(e,1)+" to "+O(e,20)}function D(e,t){if(t){var n=e.weaponDiceNum.get(t)+"d"+e.dieSize.get(t),a=e.damageAbilityScore.getMod(t)+e.weaponSpec.get(t)*e.proficiency.getProf(t);return"("+(e.weaponDiceNum.get(t)*(e.dieSize.get(t)+1)/2+a)+") "+n+" + "+a}return""}function O(e,t){var n;return n=e.useOverride.isTrue()?e.override.get(t):e.attackAbilityScore.getMod(t)+e.proficiency.get(t)+e.itemBonus.get(t),n+=e.MAP.get(t)}function M(e,t){var n=O(e,t);return e.useMiscModifiers.isTrue()&&(n+=e.circumstanceBonus.get(t)+e.statusBonus.get(t)+-e.circumstancePenalty.get(t)+-e.statusPenalty.get(t)+-e.itemPenalty.get(t)+-e.untypedPenalty.get(t)),n}function j(e,t){var n=t.selectedLevel;if(n){var a=M(e,n),l=e.weaponDiceNum.get(n)*(e.dieSize.get(n)+1)/2+(e.damageAbilityScore.getMod(n)+e.weaponSpec.get(n)*e.proficiency.getProf(n)),i=t.AC,r=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=e-t;return a<-20?0:a<-9?n?10:5:a<8?5*(11+a):95}(a,i);return(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=e-t;return a<-29?0:a<-20?5:a<-9?5*(n?19:20+a):a<-1?50:a<9?5*(8-a):5}(a,i)*l+r*l*2)/100}}var W=function(e){var t=e.effect.MAP,n=t.levelChange;return null===n&&(n="never"),l.a.createElement(p,{description:"Multiple Attack Penalty: "+t.getDescription(e.selectedLevel),listInput:l.a.createElement("div",{className:"MAPInput"},l.a.createElement("div",null,"Number of Previous Attacks: ",l.a.createElement("select",{value:t.getPrevAttacks(),onChange:e.onChange.bind(null,"prevAttacks")},l.a.createElement("option",{value:"0"},"0"),l.a.createElement("option",{value:"1"},"1"),l.a.createElement("option",{value:"2"},"2+"))," x ",l.a.createElement("select",{value:t.getInitial(),onChange:e.onChange.bind(null,"initial")},l.a.createElement("option",{value:"-5"},"-5"),l.a.createElement("option",{value:"-4"},"-4"),l.a.createElement("option",{value:"-3"},"-3"),l.a.createElement("option",{value:"-2"},"-2"),l.a.createElement("option",{value:"-1"},"-1"))),l.a.createElement("div",null,"(At level: ",l.a.createElement(b,{value:n,onChange:e.onChange.bind(null,"changeLevel")}),", Change to: ",l.a.createElement("select",{value:t.getChanged(),onChange:e.onChange.bind(null,"changed")},l.a.createElement("option",{value:"-5"},"-5"),l.a.createElement("option",{value:"-4"},"-4"),l.a.createElement("option",{value:"-3"},"-3"),l.a.createElement("option",{value:"-2"},"-2"),l.a.createElement("option",{value:"-1"},"-1"),l.a.createElement("option",{value:"0"},"0")),")"))})};var R=function(e){return l.a.createElement("div",{className:"InputGroup OverrideInput"},l.a.createElement(g,{checked:e.effect.useOverride.isTrue(),onChange:e.onEffectChange.bind(null,"useOverride",null),label:"Override Attack Bonus?"}),l.a.createElement(p,{description:"Override: "+e.effect.override.getDescription(e.selectedLevel),listInput:l.a.createElement(E,{modifier:e.effect.override,onChange:e.onEffectChange.bind(null,"override",null)})}))};function z(e){return l.a.createElement("div",{className:"Presets ProficiencyPresets"},l.a.createElement(g,{className:"PresetItem",checked:e.proficiency.isFighter(),onChange:e.onChange.bind(null,"fighter"),label:"Fighter"}),l.a.createElement(g,{className:"PresetItem",checked:e.proficiency.isMartial(),onChange:e.onChange.bind(null,"martial"),label:"Martial"}),l.a.createElement(g,{className:"PresetItem",checked:e.proficiency.isCaster(),onChange:e.onChange.bind(null,"caster"),label:"Caster"}),l.a.createElement(g,{className:"PresetItem",checked:e.proficiency.isAlchemist(),onChange:e.onChange.bind(null,"alchemist"),label:"Alchemist/Warpriest"}))}function T(e){var t=e.proficiency,n=t.getProficiencies().map((function(n,a){if(0===a)return l.a.createElement("div",{key:"initial"},l.a.createElement("label",null," Initial: ",l.a.createElement("select",{value:t.getInitial(),onChange:e.onChange.bind(null,"initial")},l.a.createElement("option",{value:"0"},"Untrained"),l.a.createElement("option",{value:"1"},"Trained"),l.a.createElement("option",{value:"2"},"Expert"),l.a.createElement("option",{value:"3"},"Master"),l.a.createElement("option",{value:"4"},"Legendary"))));var i=t.getLevelAcquired(n);return null===i&&(i="never"),l.a.createElement(C,{key:n,name:A.toName(n),value:i,onChange:e.onChange.bind(null,n)})}));return t.getMax()<4&&n.push(l.a.createElement(C,{key:t.getMax()+1,name:A.toName(t.getMax()+1),value:"never",onChange:e.onChange.bind(null,t.getMax()+1)})),l.a.createElement("div",{className:"ProficiencyInputList"},n)}function U(e){return l.a.createElement("div",{className:"InputGroup WeaponProficiencyInput"},l.a.createElement(z,{proficiency:e.effect.proficiency,onChange:e.onEffectChange.bind(null,"proficiency",null)}),l.a.createElement(p,{description:"Proficiency: "+e.effect.proficiency.getDescription(e.selectedLevel),listInput:l.a.createElement(T,{proficiency:e.effect.proficiency,onChange:e.onEffectChange.bind(null,"proficiency",null)})}))}function G(e){var t=e.score,n=[];n.push(l.a.createElement("div",{key:"initial"},l.a.createElement("label",null," Initial: ",l.a.createElement("select",{value:t.getInitial(),onChange:e.onChange.bind(null,"initial")},l.a.createElement("option",{value:"8"},"8"),l.a.createElement("option",{value:"10"},"10"),l.a.createElement("option",{value:"12"},"12"),l.a.createElement("option",{value:"14"},"14"),l.a.createElement("option",{value:"16"},"16"),l.a.createElement("option",{value:"18"},"18")))));for(var a=t.getBoosts(),i=0;i<a.length;i++)n.push(l.a.createElement("div",{key:i},l.a.createElement("label",null," Boost ",5*(1+i),": ",l.a.createElement("input",{type:"checkbox",checked:a[i],onChange:e.onChange.bind(null,i)}))));var r=t.getApexLevel();return null===r&&(r="never"),n.push(l.a.createElement(C,{key:"apex",name:"Apex Level",value:r,onChange:e.onChange.bind(null,"apex")})),l.a.createElement("div",{className:"AbilityScoreInput"},n)}function V(e){return l.a.createElement("div",{className:"Presets AbilityScorePresets"},l.a.createElement(g,{className:"PresetItem",checked:e.score.is18a(),onChange:e.onChange.bind(null,"18a"),label:"18a"}),l.a.createElement(g,{className:"PresetItem",checked:e.score.is16a(),onChange:e.onChange.bind(null,"16a"),label:"16a"}),l.a.createElement(g,{className:"PresetItem",checked:e.score.is16pp(),onChange:e.onChange.bind(null,"16++"),label:"16++"}),l.a.createElement(g,{className:"PresetItem",checked:e.score.is14p(),onChange:e.onChange.bind(null,"14+"),label:"14+"}),l.a.createElement(g,{className:"PresetItem",checked:e.score.is10(),onChange:e.onChange.bind(null,"10"),label:"10"}))}function F(e){return l.a.createElement("div",{className:"InputGroup AbilityScoreInput"},l.a.createElement(V,{score:e.effect.attackAbilityScore,onChange:e.onChange}),l.a.createElement(p,{description:"Attack Ability Score: "+e.effect.attackAbilityScore.getDescription(e.selectedLevel),listInput:l.a.createElement(G,{score:e.effect.attackAbilityScore,onChange:e.onChange})}))}function q(e){return l.a.createElement("div",{className:"InputGroup AbilityScoreInput"},l.a.createElement(V,{score:e.effect.damageAbilityScore,onChange:e.onChange}),l.a.createElement(p,{description:"Damage Ability Score: "+e.effect.damageAbilityScore.getDescription(e.selectedLevel),listInput:l.a.createElement(G,{score:e.effect.damageAbilityScore,onChange:e.onChange})}))}function $(e){return l.a.createElement("div",{className:"Presets ItemBonusPresets"},l.a.createElement(g,{className:"PresetItem",checked:e.itemBonus.isNone(),onChange:e.onChange.bind(null,"None"),label:"None"}),l.a.createElement(g,{className:"PresetItem",checked:e.itemBonus.isABPWeaponBonus(),onChange:e.onChange.bind(null,"ABPWeaponBonus"),label:"ABP Weapon"}),l.a.createElement(g,{className:"PresetItem",checked:e.itemBonus.isABPSkill1(),onChange:e.onChange.bind(null,"ABPSkill1"),label:"ABP Skill Item 1"}),l.a.createElement(g,{className:"PresetItem",checked:e.itemBonus.isABPSkill2(),onChange:e.onChange.bind(null,"ABPSkill2"),label:"ABP Skill Item 2"}))}var J=function(e){return l.a.createElement("div",{className:"InputGroup ItemBonusInput"},l.a.createElement($,{itemBonus:e.effect.itemBonus,onChange:e.onChange.bind(null,null)}),l.a.createElement(p,{description:"Item Bonus: "+e.effect.itemBonus.getDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.itemBonus,onChange:e.onChange})}))};function K(e){return l.a.createElement("div",{className:"Presets BonusPresets"},l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(0),onChange:e.onChange.bind(null,"0"),label:"+0"}),l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(1),onChange:e.onChange.bind(null,"+1"),label:"+1"}),l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(2),onChange:e.onChange.bind(null,"+2"),label:"+2"}),l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(3),onChange:e.onChange.bind(null,"+3"),label:"+3"}),l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(4),onChange:e.onChange.bind(null,"+4"),label:"+4"}))}function H(e){return l.a.createElement("div",{className:"Presets PenaltyPresets"},l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(0),onChange:e.onChange.bind(null,"0"),label:"-0"}),l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(1),onChange:e.onChange.bind(null,"+1"),label:"-1"}),l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(2),onChange:e.onChange.bind(null,"+2"),label:"-2"}),l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(3),onChange:e.onChange.bind(null,"+3"),label:"-3"}),l.a.createElement(g,{className:"PresetItem",checked:e.modifier.is(4),onChange:e.onChange.bind(null,"+4"),label:"-4"}))}function Q(e,t){if(t)return"("+(e.circumstanceBonus.get(t)+e.statusBonus.get(t)+-e.circumstancePenalty.get(t)+-e.statusPenalty.get(t)+-e.itemPenalty.get(t)+-e.untypedPenalty.get(t))+")"}var X=function(e){return l.a.createElement("div",{className:"ModifierInput"},l.a.createElement(p,{description:"Circumstance/Status Bonuses/Penalties: "+Q(e.effect,e.selectedLevel),listInput:l.a.createElement("div",{className:"ModifierInputList"},l.a.createElement("div",{className:"InputGroup"},l.a.createElement(K,{modifier:e.effect.statusBonus,onChange:e.onEffectChange.bind(null,"statusBonus",null)}),l.a.createElement(p,{description:"Status Bonus: "+e.effect.statusBonus.getDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.statusBonus,onChange:e.onEffectChange.bind(null,"statusBonus")})})),l.a.createElement("div",{className:"InputGroup"},l.a.createElement(K,{modifier:e.effect.circumstanceBonus,onChange:e.onEffectChange.bind(null,"circumstanceBonus",null)}),l.a.createElement(p,{description:"Cicumstance Bonus: "+e.effect.circumstanceBonus.getDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.circumstanceBonus,onChange:e.onEffectChange.bind(null,"circumstanceBonus")})})),l.a.createElement("div",{className:"InputGroup"},l.a.createElement(H,{modifier:e.effect.statusPenalty,onChange:e.onEffectChange.bind(null,"statusPenalty",null)}),l.a.createElement(p,{description:"Status Penalty: "+e.effect.statusPenalty.getDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.statusPenalty,onChange:e.onEffectChange.bind(null,"statusPenalty")})})),l.a.createElement("div",{className:"InputGroup"},l.a.createElement(H,{modifier:e.effect.circumstancePenalty,onChange:e.onEffectChange.bind(null,"circumstancePenalty",null)}),l.a.createElement(p,{description:"Cicumstance Penalty: "+e.effect.circumstancePenalty.getDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.circumstancePenalty,onChange:e.onEffectChange.bind(null,"circumstancePenalty")})})),l.a.createElement("div",{className:"InputGroup"},l.a.createElement(H,{modifier:e.effect.itemPenalty,onChange:e.onEffectChange.bind(null,"itemPenalty",null)}),l.a.createElement(p,{description:"Item Penalty: "+e.effect.itemPenalty.getDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.itemPenalty,onChange:e.onEffectChange.bind(null,"itemPenalty")})})),l.a.createElement("div",{className:"InputGroup"},l.a.createElement(H,{modifier:e.effect.untypedPenalty,onChange:e.onEffectChange.bind(null,"untypedPenalty",null)}),l.a.createElement(p,{description:"Untyped Penalty: "+e.effect.untypedPenalty.getDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.untypedPenalty,onChange:e.onEffectChange.bind(null,"untypedPenalty")})})))}))};function Y(e){return l.a.createElement("div",{className:"Presets WeaponDiceNumPresets"},l.a.createElement(g,{className:"PresetItem",checked:e.diceNum.isABPWeaponDiceNum(),onChange:e.onChange.bind(null,"ABPWeaponDiceNum"),label:"ABP Weapon"}))}function Z(e){return l.a.createElement("div",{className:"InputGroup WeaponDiceNumInput"},l.a.createElement(Y,{diceNum:e.effect.weaponDiceNum,onChange:e.onChange.bind(null,null)}),l.a.createElement(p,{description:"Weapon Dice: "+e.effect.weaponDiceNum.getDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.weaponDiceNum,onChange:e.onChange})}))}function _(e){return l.a.createElement("div",{className:"Presets DieSizePresets"},l.a.createElement(g,{className:"PresetItem",checked:e.dieSize.isd4(),onChange:e.onChange.bind(null,"d4"),label:"d4"}),l.a.createElement(g,{className:"PresetItem",checked:e.dieSize.isd6(),onChange:e.onChange.bind(null,"d6"),label:"d6"}),l.a.createElement(g,{className:"PresetItem",checked:e.dieSize.isd8(),onChange:e.onChange.bind(null,"d8"),label:"d8"}),l.a.createElement(g,{className:"PresetItem",checked:e.dieSize.isd10(),onChange:e.onChange.bind(null,"d10"),label:"d10"}),l.a.createElement(g,{className:"PresetItem",checked:e.dieSize.isd12(),onChange:e.onChange.bind(null,"d12"),label:"d12"}))}function ee(e){return l.a.createElement("div",{className:"InputGroup DieSizeInput"},l.a.createElement(_,{dieSize:e.effect.dieSize,onChange:e.onChange.bind(null,null)}),l.a.createElement(p,{description:"Die Size: "+e.effect.dieSize.getDieSizeDescription(e.selectedLevel),listInput:l.a.createElement(y,{modifier:e.effect.dieSize,onChange:e.onChange})}))}function te(e){return l.a.createElement("div",{className:"Presets WeaponSpecPresets"},l.a.createElement(g,{className:"PresetItem",checked:e.weaponSpec.isWSMartial(),onChange:e.onChange.bind(null,"WSMartial"),label:"Martial"}),l.a.createElement(g,{className:"PresetItem",checked:e.weaponSpec.isWSCaster(),onChange:e.onChange.bind(null,"WSCaster"),label:"Caster"}))}var ne=function(e){return l.a.createElement("div",{className:"InputGroup WeaponSpecInput"},l.a.createElement(te,{weaponSpec:e.effect.weaponSpec,onChange:e.onChange}),l.a.createElement(p,{description:"Weapon Specialization: "+e.effect.weaponSpec.getDescription(e.selectedLevel),listInput:l.a.createElement(E,{modifier:e.effect.weaponSpec,onChange:e.onChange})}))},ae=["Fire","Ice","Shock","Keen"];function le(e){for(var t=[],n=0;n<ae.length;n++)t.push(l.a.createElement("option",{value:ae[n]},ae[n]));return l.a.createElement("select",{value:e.value,onChange:e.onChange},l.a.createElement("option",{value:"None"},"None"),t)}function ie(e){for(var t=e.runes,n=[],a=0;a<=t.length;a++)n.push(l.a.createElement("tr",{key:a},l.a.createElement("td",null,l.a.createElement(le,{value:t.getName(a),onChange:e.onChange.bind(null,a,"EntryName")})),l.a.createElement("td",null,l.a.createElement(b,{value:t.getLevelAdded(a),onChange:e.onChange.bind(null,a,"LevelAdded")})),l.a.createElement("td",null,l.a.createElement(b,{value:t.getLevelRemoved(a),onChange:e.onChange.bind(null,a,"LevelRemoved")}))));return l.a.createElement("div",{className:"Runes"},l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Rune Name"),l.a.createElement("th",null,"Level Added"),l.a.createElement("th",null,"Level Removed"))),l.a.createElement("tbody",null,n)))}for(var re=function(e){var t=e.effect.runes;return l.a.createElement("div",{className:"RuneInput"},l.a.createElement(p,{description:t.getDescription(),listInput:l.a.createElement(ie,{runes:t,onChange:e.onChange})}))},ce=(n(24),[1,1,5,13]),se=[18,[!0,!0,!0,!0],17],ue=new Array(20).fill(0),oe=0;oe<20;oe++)oe+1>=16?ue[oe]=3:oe+1>=10?ue[oe]=2:oe+1>=2&&(ue[oe]=1);for(var he=new Array(20).fill(0),fe=7;fe<=20;fe++)fe<15&&(he[fe-1]=1),fe>=15&&(he[fe-1]=2);for(var ve=new Array(20).fill(1),de=0;de<20;de++)de+1>=19?ve[de]=4:de+1>=12?ve[de]=3:de+1>=4&&(ve[de]=2);var me=new Array(20).fill(8);function ge(e){return l.a.createElement("div",{className:"StrikeInput"},l.a.createElement(p,{description:"Total Bonus: "+B(e.effect,e.selectedLevel),listInput:l.a.createElement("div",{className:"CheckInput"},l.a.createElement(p,{description:"Attack Bonus: "+x(e.effect,e.selectedLevel),listInput:l.a.createElement("div",null,l.a.createElement(R,{effect:e.effect,onEffectChange:e.onEffectChange,selectedLevel:e.selectedLevel}),l.a.createElement(U,{effect:e.effect,onEffectChange:e.onEffectChange,selectedLevel:e.selectedLevel}),l.a.createElement(F,{effect:e.effect,onChange:e.onEffectChange.bind(null,"attackAbilityScore",null),selectedLevel:e.selectedLevel}),l.a.createElement(J,{effect:e.effect,onChange:e.onEffectChange.bind(null,"itemBonus"),selectedLevel:e.selectedLevel}))}),l.a.createElement(X,{effect:e.effect,onEffectChange:e.onEffectChange,selectedLevel:e.selectedLevel}),l.a.createElement(W,{effect:e.effect,onChange:e.onEffectChange.bind(null,"MAP",null),selectedLevel:e.selectedLevel}))}),l.a.createElement(p,{description:"Total Damage: "+D(e.effect,e.selectedLevel),listInput:l.a.createElement("div",{className:"DamageInput"},l.a.createElement(q,{effect:e.effect,onChange:e.onEffectChange.bind(null,"damageAbilityScore",null),selectedLevel:e.selectedLevel}),l.a.createElement(Z,{effect:e.effect,onChange:e.onEffectChange.bind(null,"weaponDiceNum"),selectedLevel:e.selectedLevel}),l.a.createElement(ee,{effect:e.effect,onChange:e.onEffectChange.bind(null,"dieSize"),selectedLevel:e.selectedLevel}),l.a.createElement(ne,{effect:e.effect,onChange:e.onEffectChange.bind(null,"weaponSpec",null),selectedLevel:e.selectedLevel}),l.a.createElement(re,{effect:e.effect,onChange:e.onEffectChange.bind(null,"runes"),selectedLevel:e.selectedLevel}))}))}function pe(e){return l.a.createElement(ge,{effect:e.effect,selectedLevel:e.selectedLevel,onEffectChange:e.onEffectChange})}function Ee(e){return l.a.createElement("div",{className:"Display"},l.a.createElement(p,{description:"Expected Damage: "+j(e.effect,e.target),listInput:""}))}function ye(e){return l.a.createElement("div",{className:"TargetInput"},l.a.createElement("div",null,l.a.createElement("label",null,"Target Level:",l.a.createElement("input",{type:"number",min:"1",max:"20",step:"1",value:e.target.selectedLevel,onChange:e.onTargetChange.bind(null,"selectedLevel")}),l.a.createElement("br",null),"1",l.a.createElement("input",{type:"range",min:"1",max:"20",step:"1",value:e.target.selectedLevel,onChange:e.onTargetChange.bind(null,"selectedLevel")}),"20")),l.a.createElement("div",null,l.a.createElement("label",null,"Target AC: ",l.a.createElement("input",{type:"number",value:e.target.AC,onChange:e.onTargetChange.bind(null,"AC")}))))}var Ce=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={target:{selectedLevel:3,AC:15},routines:[[{MAP:new P,useOverride:new k,override:new w,proficiency:Object(s.a)(A,ce),attackAbilityScore:Object(s.a)(L,se),itemBonus:new w(ue),useMiscModifiers:new k(!0),circumstanceBonus:new w,statusBonus:new w,circumstancePenalty:new w,statusPenalty:new w,itemPenalty:new w,untypedPenalty:new w,damageAbilityScore:Object(s.a)(L,se),weaponDiceNum:new w(ve),dieSize:new w(me),weaponSpec:new w(he),runes:new S}]],selectedRoutine:0,selectedEffect:0},a.handleEffectChange=a.handleEffectChange.bind(Object(h.a)(a)),a.handleTargetChange=a.handleTargetChange.bind(Object(h.a)(a)),a}return Object(o.a)(n,[{key:"handleTargetChange",value:function(e,t){var n;switch(e){case"selectedLevel":case"AC":n=t.target.value;break;default:n=t.target.value}var a=m()(this.state.target,Object(c.a)({},e,{$set:n}));this.setState({target:a})}},{key:"handleEffectChange",value:function(e,t,n,a){var l=this.state.routines[this.state.selectedRoutine][this.state.selectedEffect][e].createUpdated(n,a,t),i=m()(this.state.routines,Object(c.a)({},this.state.selectedRoutine,Object(c.a)({},this.state.selectedEffect,Object(c.a)({},e,{$set:l}))));this.setState({routines:i})}},{key:"handleEffectItemChange",value:function(e){}},{key:"render",value:function(){return l.a.createElement("div",{className:"PF2App"},l.a.createElement(ye,{target:this.state.target,onTargetChange:this.handleTargetChange}),l.a.createElement(Ee,{target:this.state.target,effect:this.state.routines[this.state.selectedRoutine][this.state.selectedEffect]}),l.a.createElement(pe,{effect:this.state.routines[this.state.selectedRoutine][this.state.selectedEffect],selectedLevel:this.state.target.selectedLevel,onEffectChange:this.handleEffectChange}))}}]),n}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(Ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.a67e0824.chunk.js.map