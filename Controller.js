var myapp = angular.module('myApp',[]);

myapp.controller('CompareController',function($scope){



    $scope.petrol ={carcost:'',effHigh:'',effLocal:'',priceperunit:'',maintcost:'',inflation:'',fuelConsMonth:0
    ,fuelConsYear:0};

    $scope.diesel ={carcost:'',effHigh:'',effLocal:'',priceperunit:'',maintcost:'',inflation:'',fuelConsMonth:0,
        fuelConsYear:0};

    $scope.usage={city:'',highway:''};

    $scope.loan={amtpetrol:'',amtdiesel:'',rate:'',duration:'',durtype:'Years',emiPetrol:0,emiDisel:0};

    $scope.inflation={diesel:10,petrol:10};

    $scope.fuelCost=[];

    $scope.objval ={year:0,totalPetrolFueCost:0,totalDieselFuelCost:0,totalMaintPetrolCost:0,totalMainDieselCost:0,
    totalLoanPCost:0,totalLoanDCost:0,totalPCost:0,totalDCost:0,petrolTotColor:'',dieselTotColor:'',petrolProfit:0,profitsumP:0,
        profitsumD:0,
        dieselProfit:0,rowStyle:''};

    $scope.compareVal=[];

    $scope.showResult =false;

$scope.final1 ={result1:''};
/*

* This function will return the Total fuel Consumed per Month by Any car
* */
    $scope.fuelConsumPerMonth = function(a)
    {
        console.log(a);
        var b = a;
        try {
            return  ($scope.usage.city / b.effLocal) + ($scope.usage.highway / b.effHigh);
        }catch(e){

           console.log(e);
        }
        return 0;
    }


    // returns the fuel cost of that year for that fuel type
    $scope.fuelCost = function(yearnumber,fuelObj,inflationObj)
    {
        try {
            var a = yearnumber - 1;
            var b = 1 + inflationObj / 100;

            return fuelObj.priceperunit * Math.pow(b, a);
        }catch ( e){
            console.log(e);

        }
        return 0;
    }

    // returns the Maintainance cost of that year for that fuel type
    $scope.maintenanceCost = function(yearnumber,fuelObj,inflationObj)
    {
       try {
           return Math.round(fuelObj.maintcost * Math.pow(((100 + inflationObj) / 100), (yearnumber - 1)));
       }catch (t){console.log(t)};
        return 0;
    }

   $scope.months = 0;
    $scope.emi = function()
    {
        try {
            if ($scope.loan.durtype == "Years") {
                $scope.months = Math.round($scope.loan.duration * 12);
            } else {
                $scope.months = Math.round($scope.loan.duration);

            }

            var r = ($scope.loan.rate / 1200);
            console.log('interest rate>>' + r);

            $scope.loan.emiPetrol = ($scope.loan.amtpetrol * r * Math.pow(1 + r, $scope.months)) / (Math.pow(1 + r, $scope.months) - 1);
            $scope.loan.emiDisel = ($scope.loan.amtdiesel * r * Math.pow(1 + r, $scope.months)) / (Math.pow(1 + r, $scope.months) - 1);

        }catch (e){console.log(e);}
        console.log('Diesel EMI Cost'+$scope.loan.emiDisel);
        console.log('Petrol EMI Cost'+$scope.loan.emiPetrol);

    }


 $scope.winnerFlag=false;

    $scope.compare = function() {

        $scope.compareVal=[];

        $scope.winnerFlag=false;
        $scope.final1.result1='';

        $scope.petrol.fuelConsMonth = $scope.fuelConsumPerMonth($scope.petrol);
        $scope.diesel.fuelConsMonth = $scope.fuelConsumPerMonth($scope.diesel);


        if(isNaN($scope.petrol.fuelConsMonth)||isNaN($scope.diesel.fuelConsMonth||$scope.petrol.carcost||isNaN($scope.diesel.carcost)))
        {
            $scope.showResult = false;
            return;
        }




        console.log('fuel per month petrol'+$scope.petrol.fuelConsMonth);
        console.log('fuel per month diesel'+$scope.diesel.fuelConsMonth);


        $scope.petrol.fuelConsYear = $scope.petrol.fuelConsMonth * 12;
        $scope.diesel.fuelConsYear = $scope.diesel.fuelConsMonth * 12;
        $scope.emi();

        var loanPetrolYearly = 0;
        var loanDieselYearly = 0;



        loanPetrolYearly =Math.round($scope.loan.emiPetrol*12);
        loanDieselYearly = Math.round($scope.loan.emiDisel*12);



        var netProfPetrol =0;
        var netProfDiesel=0;

        console.log( 'ddddd'+isNaN(loanPetrolYearly));
        console.log('ppppp'+isNaN(loanDieselYearly));
        console.log( 'ddddd 1'+(loanPetrolYearly));
        console.log('ppppp 1'+(loanDieselYearly));

        console.log( 'ddddd 1'+(loanPetrolYearly.type));
        console.log('ppppp 1'+(loanDieselYearly.type));

        console.log( 'qqqqq'+$scope.diesel.fuelConsYear);
        console.log('wwwww'+$scope.petrol.fuelConsYear);




        /* if(!isNaN(loanPetrolYearly)||!isNaN(loanDieselYearly)||!$scope.petrol.fuelConsYear.isNaN()||!$scope.diesel.fuelConsYear.isNaN())
          {
              console.log('value is false');
           return;
          }
*/


     /*   try{
        if(!validateUndefinedAndNull(loanDieselYearly,true)||!validateUndefinedAndNull(loanPetrolYearly,true)||
            !validateUndefinedAndNull($scope.petrol.fuelConsYear,true)||  !validateUndefinedAndNull($scope.diesel.fuelConsYear,true)){

            return ;
        }}catch(e){console.log(e);}
*/

        for (var i = 1; i <= 10; i++) {
                console.log(" value of i is" + i);

                var obj = {};
                obj.year = i;

                // Need to calculate the Effective fuel cost Per Litre
                var fuelPCostPerLtr = $scope.fuelCost(i, $scope.petrol, $scope.inflation.petrol);
                var fuelDCostPerLtr = $scope.fuelCost(i, $scope.diesel, $scope.inflation.diesel);

                console.log('diesel /ltr' + fuelDCostPerLtr);
                console.log('petrol /ltr' + fuelPCostPerLtr);


                // Maintenance Cost
                obj.totalMaintPetrolCost = $scope.maintenanceCost(i, $scope.petrol, 10);
                obj.totalMainDieselCost = $scope.maintenanceCost(i, $scope.diesel, 10);


                // Need to calculate the Cost of Fuel Consumed Whole Year
                obj.totalPetrolFueCost = Math.round(fuelPCostPerLtr * $scope.petrol.fuelConsYear);
                obj.totalDieselFuelCost = Math.round(fuelDCostPerLtr * $scope.diesel.fuelConsYear);


                if ($scope.months / 12 >= i) {
                    obj.totalLoanPCost = loanPetrolYearly;
                    obj.totalLoanDCost = loanDieselYearly;

                }
                else {

                    obj.totalLoanPCost = 0;
                    obj.totalLoanDCost = 0;

                }


                obj.totalPCost = obj.totalLoanPCost + obj.totalMaintPetrolCost + obj.totalPetrolFueCost;
                obj.totalDCost = obj.totalLoanDCost + obj.totalMainDieselCost + obj.totalDieselFuelCost;

                obj.dieselProfit = -obj.totalDCost + obj.totalPCost;
                obj.petrolProfit = -obj.totalPCost + obj.totalDCost;


                if (obj.totalDCost < obj.totalPCost) {
                    obj.dieselTotColor = "green";
                    obj.petrolTotColor = "red";
                }
                else {
                    obj.dieselTotColor = "red";
                    obj.petrolTotColor = "green";


                }

                var changePFlag = getBetterCar(netProfPetrol,netProfPetrol + obj.petrolProfit);
                var changeDFlag = getBetterCar(netProfDiesel,netProfDiesel + obj.dieselProfit);

               if(!$scope.winnerFlag) {
                   if(getWinner(changePFlag, changeDFlag, i))
                   {

                       $scope.winnerFlag =true;
                       obj.rowStyle="background-color: #c1e2b3;";
                   }

               }
                netProfPetrol = netProfPetrol + obj.petrolProfit;
                netProfDiesel = netProfDiesel + obj.dieselProfit;


                obj.profitsumD = netProfDiesel;
                obj.profitsumP = netProfPetrol;


                console.log(obj);
                console.log($scope.compareVal);

                $scope.compareVal.push(obj);
                obj = {};


            }


            var sumP = 0;
            var sumD = 0;
            var sumPProf = 0;
            var sumDProf = 0;

            for (var i = 0; i < $scope.compareVal.length; i++) {
                sumP = sumP + $scope.compareVal[i].totalPCost;
                sumD = sumD + $scope.compareVal[i].totalDCost;
                sumDProf = sumDProf + $scope.compareVal[i].dieselProfit;
                sumPProf = sumPProf + $scope.compareVal[i].petrolProfit;

            }

            var obj = {};
            obj.dieselProfit = sumDProf;
            obj.petrolProfit = sumPProf;
            obj.totalDCost = sumD;
            obj.totalPCost = sumP;

            $scope.compareVal.push(obj);
         if(!$scope.winnerFlag)
         {
             if(obj.totalPCost <     obj.totalDCost)
             {
              $scope.final1.result1='Petrol Car is better then Diesel Car';
             }
             else
             {
                 $scope.final1.result1='Diesel Car is better then Petrol Car';

             }
             $scope.winnerFlag=true;

         }



            $scope.showResult = true;
        }


    function validateUndefinedAndNull(val,flag){
        console.log('value is'+val);
        try{
        if(val==undefined){return false;}else{
        if(flag){ if(isNaN(val)){
            return true;} else { return false}
        } return true;
    }}catch(e){console.log(e)}}

    function getBetterCar(profitOld, profitNew)
    {
     if(profitOld<0 && profitNew >=0){return true;}
    }

    function getWinner(petrolFlag, dieselFlag, YearNumber){

        if(petrolFlag&&!dieselFlag){
           $scope.final1.result1 =" Petrol Car is better then Diesel car in"+YearNumber+getYearNumberMapping(YearNumber)+" year of its use";
            return true;
        }
        else   if(!petrolFlag&&dieselFlag){
            $scope.final1.result1 =" Diesel Car is better then Petrol car in "+YearNumber+getYearNumberMapping(YearNumber)+" year of its use";
            return true;
        }

    }

    function getYearNumberMapping(yearNo){

        if(yearNo==1){return 'st';}else if(yearNo==2){return 'nd' }else return 'th';

    }
});
