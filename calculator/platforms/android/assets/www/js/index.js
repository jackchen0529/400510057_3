var operator = new Array ("+","-","x","÷");
var operatorsym = new Array ("0","1","3","2");
//計算基本函式
function add  (x, y) {

      return parseFloat(x) + parseFloat(y);
   }
function divide  (x, y) {
      if (y == 0) {
        alert("Can't divide by 0");
        return 0;
      }
      return parseFloat(x) / parseFloat(y);
   }
function multiply  (x, y) {
     return parseFloat(x) * parseFloat(y);
   }
function subtract  (x, y) {
      return parseFloat(x) - parseFloat(y);
 }
//放值進運算欄
function setValue(val)
{
	   $(".displayword").html(val);
}
function setresultValue(val)
{
	   $(".displayresult").html(val);
}
//從運算欄取值
function getValue()
{
	 return   $(".displayword").text()+"";
}
//判斷數值與小數點
function entervalue(buttonkey) 
{
	
	var displayword = getValue();
	var wordlength = displayword.length;
	 if ( displayword === "0") {
          setValue("");
       }
	if (buttonkey === "."  && sessionStorage.getItem("dot")=="true") {
          return;
        }
	if(buttonkey === "."){
	 	sessionStorage.setItem("dot","true");
	 }
	if(sessionStorage.getItem("operatorclick") == "true")
		sessionStorage.setItem("operatorclick", "false");
	setValue( getValue()+ buttonkey);
	sessionStorage.setItem("valuearray", getValue());
	      result(0);
}
//判斷運算元
function setOperator(newOperator) {
	 $("#keyDel").html("DEL");
	if(sessionStorage.getItem("operatorclick") == undefined || sessionStorage.getItem("operatorclick") =="false")
	{
		
		setValue( getValue()+ newOperator);
		sessionStorage.setItem("valuearray", getValue());
		sessionStorage.setItem("operatorclick", "true");
		sessionStorage.setItem("dot","false");
		       result(0);
	}
	else
		return ;
	
}
function clearoneword(){ //0代表平常下方的 1代表算完 // . BUG 運算值BUG
		
 		var oldword= getValue();
 		var wordlength = oldword.length;
 		var newword = oldword.substring( 0, wordlength-1);
 		var know=0;
 		sessionStorage.setItem("valuearray",newword);
 		for(var i=0;i<=3;i++)
 		{
 			if(newword.substring( wordlength-2, wordlength-1)==operator[i])
 			know++;
 		}
 		if(know!=0)
 		sessionStorage.setItem("operatorclick", "true");
 		else
 		sessionStorage.setItem("operatorclick", "false");
 		if(oldword.substring( wordlength-1, wordlength)=='.')
 			sessionStorage.setItem("dot","false");
 		if(wordlength==1)
 		setValue("0");
 		else
 		setValue(newword);
 }
function howlarge(oper)
{
	for(var i=0;i<=3;i++)
	{
		if(oper == operator[i])
		return operatorsym[i];
	}
}

function knowhow(operatorarray,operator,numarray)
{
	var oplength = operatorarray.length;
	var numlength = numarray.length;
	
	if(oplength==0 || oplength==undefined)
	{
		
		operatorarray[0]=operator;
	}
	else if(operator=="0") //最後先跑一次
	{
		if(numlength>=2 )
		{
			var newsum=1.3;
			switch(operatorarray[oplength-1])
			{
					case "+":
						newsum=add(numarray[numlength-2],numarray[numlength-1]);
						break;
					case "-":
						newsum=subtract(numarray[numlength-2],numarray[numlength-1]);
						break;
					case "x":
						newsum=multiply(numarray[numlength-2],numarray[numlength-1]);
						break;
					case "÷":
						newsum=divide(numarray[numlength-2],numarray[numlength-1]);
						break;
			}
			operatorarray.splice(oplength-1,1);
			numarray.splice(numlength-2,2,newsum);
		}
	}
	else	 //假設開始算的話
	{
			var thisop = howlarge(operator);
			var lastop =  howlarge(operatorarray[oplength-1]);
		if(numlength>=2 && thisop<=lastop )
		{
			var situation =0;
			while (numlength>=2 && thisop<=lastop )
			{
				var newsum =0.3;
					var caloperator="";
					if(thisop<=lastop)
						{caloperator=operatorarray[oplength-1];situation=1;}
					switch(caloperator)
					{
						case "+":
							newsum=add(numarray[numlength-2],numarray[numlength-1]);
							break;
						case "-":
							newsum=subtract(numarray[numlength-2],numarray[numlength-1]);
							break;
						case "x":
							newsum=multiply(numarray[numlength-2],numarray[numlength-1]);
							break;
						case "÷":
							newsum=divide(numarray[numlength-2],numarray[numlength-1]);
							break;
					}
					operatorarray.splice(oplength-1,1);
					numarray.splice(numlength-2,2,newsum);
					oplength=operatorarray.length;
					numlength = numarray.length;
					lastop =  howlarge(operatorarray[oplength-1]);
			}
					if(situation==1)
					{
						oplength=operatorarray.length;
						operatorarray[oplength]=operator;
					}

		}
		else
			operatorarray[oplength]=operator;
			
	}

}
function midtofront(valuearray){
	var wordlength = valuearray.length;
	//初始化
	var countoperatornum=0;
	for(var i=0 ; i< wordlength;i++)
	{
		for(var j=0;j<=3;j++)
 		{
 			if(valuearray.substring(i, i+1)==operator[j])
 			countoperatornum++;
 		}
 	}
	var frontarray = new Array(2*countoperatornum+1);
	var countoperator=0;
	var whichoperator=0;
	for(var i=0 ; i< wordlength;i++)
	{
		var know =0;
		for(var j=0;j<=3;j++)
 		{
 			if(valuearray.substring(i, i+1)==operator[j])
 			know++;
 		}
 		if(know!=0)
 		{
 			frontarray[whichoperator]= valuearray.substring(countoperator, i);
 			whichoperator++;
 			frontarray[whichoperator]= valuearray.substring(i,i+1);
 			whichoperator++;
 			countoperator=i+1;
 		}
	}
	frontarray[whichoperator]= valuearray.substring(countoperator, wordlength);
	//開始轉序
	var operatorarray = new Array();
	var operatorwhere =0;
	var numarray  =new Array();
	var numwhere =0;
	
	for(var i=0; i<=whichoperator;i++)
	{
		
			switch(frontarray[i])
			{
				case "+":
				case "-":
				case "x":
				case "÷":
						knowhow(operatorarray,frontarray[i],numarray);
			 		break;
			default:
				numwhere=numarray.length;
				numarray[numwhere]=parseFloat(frontarray[i]);
			}
	}
	
	if(operatorarray.length>=1)
		knowhow(operatorarray,"0",numarray);

	while(operatorarray.length>=1)
	{
		
		var operalength = operatorarray.length;
		var numlength = numarray.length;
		var newsum=1.3;
		switch(operatorarray[0])
		{
				case "+":
					newsum=add(numarray[0],numarray[1]);
					break;
				case "-":
					newsum=subtract(numarray[0],numarray[1]);
					break;
		}
		operatorarray.splice(0,1);
		numarray.splice(0,2,newsum);
	}
	return numarray[0];

}

 function result(situation){ //0代表平常下方的 1代表算完
 	if(situation==1)
 	{
	 	var valuearray = sessionStorage.getItem("valuearray");
	 	var wordlength = valuearray.length;
	 	var know=0;
 		for(var i=0;i<=3;i++)
 		{
 			if(valuearray.substring( wordlength-1, wordlength)==operator[i])
 			know++;
 		}
 		if(know!=0)
 			valuearray = valuearray.substring( 0, wordlength-1);
 		setValue(midtofront(valuearray));
 	}
 	else
 	{
 		var valuearray = sessionStorage.getItem("valuearray");
	 	var wordlength = valuearray.length;
	 	var know=0;
 		for(var i=0;i<=3;i++)
 		{
 			if(valuearray.substring( wordlength-1, wordlength)==operator[i])
 			know++;
 		}
 		if(know!=0)
 			valuearray = valuearray.substring( 0, wordlength-1);
 		setresultValue(midtofront(valuearray));
 	}
 }
 function ac(){
 	sessionStorage.clear();
 	setValue(0);
 	setresultValue(0);
 }
function calculator(id,buttonkey) {
	
      /*id = this.id;*/
    // this is a performance boost
    /*event.preventDefault();
    event.stopPropagation();*/
   //
    switch (id) {
      case "key0":
      case "key1":
      case "key2":
      case "key3":
      case "key4":
      case "key5":
      case "key6":
      case "key7":
      case "key8":
      case "key9":
      case "keyDecimalPoint":
     	 $("#keyDel").html("DEL");
        entervalue(buttonkey);
        break;
        case "keyEquals":
        result(1);
        $("#keyDel").html("CLR");
        setresultValue('');
        break;
     	case "keyDel":
     	if(	$("#keyDel").text()=="DEL")
        clearoneword(); 
        else
        ac();
        break;
      case "keyPlus":
       setOperator("+");
        break;
      case "keyMinus":
       setOperator("-");
        break;
      case "keyMultiply":
      setOperator("x");
        break;
      case "keyDivide":
     setOperator("÷");
        break;
      
     
    }
   

}