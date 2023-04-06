var app = angular.module("myApp",[]);
app.controller("myController", function($scope, $http){
    $scope.list =[];
    $scope.viTri =-1;
    $scope.request ={
         ma:"",
         ten:"",
         tuoi:0,
         diaChi:"",
    }

    let url = "http://localhost:8080/api/user";
    let api = url + "/hien-thi";

    hienThi();
    function hienThi(){
        $http.get(api).then(function (response) {
            $scope.list = response.data;
          }),
            function (errors) {
              console.log(errors);
            };
    }
    $scope.removeSinhVien = function (event, index) {
        event.preventDefault();
        let sv = $scope.list[index];
        let api = url + "/delete/" + sv.id;
        $http.delete(api).then(function () {
          $scope.list.splice(index, 1);
          alert("Xoa thanh cong");
        }),
          function (errors) {
            console.log(errors);
          };
      };

      $scope.detailSinhVien = function (event, index) {
        event.preventDefault();
        let sv = $scope.list[index];
        $scope.request.ten = sv.ten;
        $scope.request.tuoi = sv.tuoi;
        $scope.request.ma = sv.ma;
        $scope.request.diaChi = sv.diaChi;
        $scope.viTri = index;
      };
    
      // update
      $scope.updateSinhVien = function () {
        if ($scope.viTri === -1) {
          alert("Vui long chon dong muon update");
        } else {
          let sv = $scope.list[$scope.viTri];
          let api = url + "/update/" + sv.id;
          $http.put(api, JSON.stringify($scope.request)).then(function () {
            alert("Update Sinh Vien thanh cong");
            hienThi();
          }),
            function (errors) {
              console.log(errors);
            };
        }
      };
    
      // add
      $scope.addSinhVien = function () {
        let api = url + "/add";
        $http.post(api, JSON.stringify($scope.request)).then(function () {
          alert("Add Sinh Vien thanh cong");
          hienThi();
        }),
          function (errors) {
            console.log(errors);
          };
      };
})

