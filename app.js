var SSOeModal = angular.module('SSOeModal', []);


SSOeModal.controller('ques1', ['$scope', function ($scope) {
    $scope.SplitWord = function()
    {
        var lines = $scope.textArea.split(".");
        if (lines.length == 0)
        {
            lines = $scope.textArea;
        }
        var dataline = []

        for (var l = 0; l < lines.length; l++) {

            var words = lines[l].split(" ");
            for (var i = 0; i < words.length - 1; i++) {
                words[i] += " ";
            }

            var data = '';
            for (var i = words.length - 1; i >= 0; i--) {
                data = (i != 0) ? data + words[i] + " " : data + words[i];
            }

            dataline.push(data);
        }

        var data = "";

        for (var i = dataline.length - 1; i >= 0; i--) {
            data = (i != 0) ? data + dataline[i] + "." : data + dataline[i];
        }

        $scope.textAreaRev = data;
        debugger;
    }
}]);


SSOeModal.controller('ques2', ['$scope', function ($scope) {
    var coinSizes = [1, 2, 5, 10, 20, 50, 100, 200];
    var conlen = coinSizes.length;

    $scope.CheckValids = function () {
        //$scope.value = count(conlen, parseInt($scope.inp));

        var target = $scope.inp;
        var ways = [];
        
        for (var i = 0; i < coinSizes.length + 1; i++) {
            ways[i] = 0;
        }
 
        ways[0] = 1;

        for (var i = 0; i < conlen; i++) {
            for (var j = coinSizes[i]; j <= target; j++) {
                ways[j] += ways[j - coinSizes[i]];
            }
        }

        for (var i = coinSizes.length; i >= 0; i--) {
            if(ways[i] > 0)
            {
                $scope.value = ways[i];
                break;
            }
        }
    };

    //function count(coins , n, N) {
    //    if (N == 0)
    //        return 1;

    //    if (N < 0 || n < 0)
    //        return 0;

    //    var include = count(n, N - coins[n]);
    //    var exclude = count(n - 1, N);

    //    return include + exclude;
    //}
}]);

SSOeModal.controller('ques3', ['$scope', '$filter', function ($scope, $filter) {
    $scope.months = [
        { name: 'Jan', value: '1' },
        { name: 'Feb', value: '2' },
        { name: 'Mar', value: '3' },
    { name: 'Apr', value: '4' },
{ name: 'May', value: '5' },
{ name: 'Jun', value: '6' },
{ name: 'Jul', value: '7' },
{ name: 'Aug', value: '8' },
{ name: 'Spe', value: '9' },
{ name: 'Oct', value: '10' },
{ name: 'Nov', value: '11' },
{ name: 'Dec', value: '12' }
    ];

    $scope.years = [
        { name: '2000', value: '2000' },
        { name: '2001', value: '2001' },
        { name: '2002', value: '2002' },
        { name: '2003', value: '2003' },
        { name: '2004', value: '2004' },
        { name: '2005', value: '2005' },
        { name: '2006', value: '2006' },
        { name: '2007', value: '2007' },
        { name: '2008', value: '2008' },
        { name: '2009', value: '2009' },
        { name: '2010', value: '2010' },
        { name: '2011', value: '2011' },
        { name: '2012', value: '2012' },
        { name: '2013', value: '2013' },
        { name: '2014', value: '2014' },
        { name: '2015', value: '2015' },
        { name: '2016', value: '2016' },
        { name: '2017', value: '2017' }
    ];

    $scope.YrMonth = [];

    $scope.CheckValues = function () {
        var fromMonth = $scope.FromMonth;
        var fromyear = $scope.FromYear;
        var tomonth = $scope.ToMonth;
        var toyear = $scope.ToYears;

        $scope.YrMonth = [];

        var years = 1;
        if (fromyear != toyear) {
            years = parseInt(toyear) + 1 - parseInt(fromyear);
        }

        var Sundays = [];

        for (var i = 1; i <= years; i++) {
            var fmonth = i == 1 ? fromMonth : 1;
            var frmMonth = fromMonth;
            var monthCount = years == 1 ? (parseInt(tomonth) + 1) - fmonth : (i == 1 && i == years ? parseInt(fromMonth) - parseInt(tomonth) : (i == years ? parseInt(tomonth) : 13 - fmonth));
            for (var j = 1; j <= monthCount; j++) {
                Sundays = [];
                var getTot = daysInMonth(parseInt(frmMonth), parseInt(fromyear));
                for (var k = 1; k <= getTot; k++) {
                    var newDate = new Date(parseInt(fromyear), parseInt(frmMonth) - 1, k);
                    if (newDate.getDay() == 0) {
                        var sun = { date: k, years: parseInt(fromyear), month: parseInt(frmMonth) };
                        Sundays.push(sun);
                    }
                }

                if (Sundays.length > 4) {
                    var monthName = $filter('filter')($scope.months, function (month) {
                        if (parseInt(month.value) == parseInt(frmMonth)) {
                            return month;
                        }
                    }, true)[0].name;
                    var yrMonth = { year: parseInt(fromyear), month: monthName };
                    $scope.YrMonth.push(yrMonth);
                }

                frmMonth = parseInt(frmMonth) == 12 ? 1 : parseInt(frmMonth) + 1;
            }
            fromyear = parseInt(fromyear) + 1;
        }
    };

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
}]);
