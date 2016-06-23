// Build your js
<% if(angular == true){ %>
var app = angular.module('app', [<% if(materialAngular == true){%>'ngMaterial'<%}%>]);
<%}%>
