/*spiralSort
* spiralSort.js
*===================================================================
*	Copyright (c) 2022 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
* Additional Array method to sort an array in spiral based on distances and radians.
*===================================================================
*
* - `Array.prototype.spiralSort(base);`
*   additional Array method returns an array sorted in spiral based on distances and radians
*   given and returned arrays are regarded as [x0,y0,x1,y1, ..., xn,yn]
*
*   [parameter] 
*   - base: an optional base value (base ≠ 1 and base > 0) for logarithm to define distance classes, default value is Euler's number (e = 2.718...)
* ------------------------------------------------------------------
*
* [static method]
* - `Array.$SUM(array);`
*   static method that returns the sum of elements in a given array
*   method format: `Array.$SUM(array) -> value`
*/
//===================================================================
//
//-------------------------------------------------------------------
//static method that returns the sum of elements in a given array
Array.$SUM=(array)=>array.reduce((e1,e2)=>e1+e2,0.0);
//-------------------------------------------------------------------
//
//additional Array method returns an array sorted in spiral based on distances and radians
//given and returned arrays are regarded as [x0,y0,x1,y1, ..., xn,yn]
//- base: an optional base value (base ≠ 1 and base > 0) for logarithm to define distance classes, default value is Euler's number (e = 2.718...)
Array.prototype.spiralSort=function(base){
	//- base: an optional base value (base ≠ 1 and base > 0) for logarithm to define distance classes, default value is Euler's number (e = 2.718...)
	//
	let arr0=this.map(e=>e),n0=arr0.length,i=0,
		X=[],Y=[],xMin=0.0,xMax=0.0,yMin=0.0,yMax=0.0,xMid=0.0,yMid=0.0,
		rad=0.0,L=0.0,L_obj={},L_class=0,keys=[],
		lnBase=1,output=[];
	//
	n0=n0%2<1?n0:arr0.push(0);
	//
	base=!base?-1:+base;
	base=!(+base>0)||!(+base!=1)?-1:+base;
	lnBase=+base<0?1:Math.log(base);
	//
	// === sample: X,Y,Xmin,Ymin,Xmax,Ymax,Xmid and Ymid ===
	X=arr0.reduce((e1,e2,idx)=>{let E=idx%2<1?e1.push(e2):e1;E=null;return e1;},[]);
	Y=arr0.reduce((e1,e2,idx)=>{let E=idx%2<1?e1:e1.push(e2);E=null;return e1;},[]);
	//
	xMin=Math.min(...X);
	xMax=Math.max(...X);
	yMin=Math.min(...Y);
	yMax=Math.max(...Y);
	//
	xMid=Array.$SUM([xMin,xMax])*0.5;
	yMid=Array.$SUM([yMin,yMax])*0.5;
	//
	//--- classes: sorting by distances ---
	i=0;
	while(i<n0){
		rad=Math.atan2(arr0[i+1]-yMid,arr0[i]-xMid);
		L=Math.sqrt((arr0[i]-xMid)*(arr0[i]-xMid)+(arr0[i+1]-yMid)*(arr0[i+1]-yMid));
		L=L!=0?L:Number.EPSILON;
		//
		//log a X = (log b X)/(log b a)
		L_class=Math.floor(Math.log(L)/lnBase);
		//
		if(!L_obj[L_class]){
			L_obj[L_class]=[];
		}
		//
		L_obj[L_class].push({idx:i,rad:rad});
		//
		i+=2;
	}
	//
	//--- sorting by radians in each class ---
	keys=Object.keys(L_obj).sort((a,b)=>a-b);
	keys.forEach(e=>{
		L_obj[e].sort((a,b)=>a.rad-b.rad).forEach(f=>output.push(arr0[f.idx],arr0[f.idx+1]));
	});
	//
	arr0=n0=i=X=Y=xMin=xMax=yMin=yMax=xMid=yMid=rad=L=L_obj=L_class=keys=lnBase=null;
	//
	return output;
};
