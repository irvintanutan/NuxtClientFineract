<template>
  <div>
    <NavBar />
    <AppHeader />
    <nuxt />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
import NavBar from '../components/NavBar'

export default {
  components: {
    AppHeader,
    NavBar
  }
}
</script>

<style>
@font-face {
  font-family: productSansReg;
  src: url('~assets/product-sans/Product Sans 400.ttf');
}

html,
body {
  font-family: productSansReg;
  text-shadow: none;
  background-color: #e5e5e5;
  height: 100%;
}

.button {
  border-radius: 6px;
  padding: 18px 15px 18px 15px;
  font-size: 14px;
}

.is-primary {
  background-color: #33c05b !important;
}

.is-danger {
  color: #d70f0f !important;
}

.title {
  color: #2d3747;
  font-size: 22px;
  font-weight: 400;
  line-height: 2;
}

.notification {
  margin-top: 35px;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px rgba(86, 88, 86, 0.5);
}

.table-controls {
  margin-bottom: 1.5rem;
  border: 1px solid #979797;
  border-radius: 2px 2px 0px 0px;
  padding: 10px;
}

.b-table .table {
  width: 100%;
  border-collapse: collapse;
}

.b-table {
  border: 1px solid #979797;
}

.table td,
.table th {
  border: none;
  padding: 1.2em 0.75em;
  vertical-align: top;
}

.table thead td,
.table thead th {
  color: #2d3747 !important;
}

.table thead {
  border-right: 1px solid rgba(51, 192, 91, 0.8);
}

.b-table th {
  background-color: rgba(51, 192, 91, 0.8);
}

.table.is-striped tbody tr:not(.is-selected):nth-child(even) {
  background-color: #effaf2;
}

.bold-td {
  font-weight: bold;
}

.pagination {
  padding-right: 20px;
}

.pagination-link.is-current {
  background-color: rgba(51, 192, 91, 0.8);
  border-color: rgba(51, 192, 91, 0.8);
  color: white;
}

.form-conatiner {
  padding: 30px;
  background-color: #f3fbf5;
}

.form-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0px;
}

.input-label {
  background-color: #ffffff !important;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 95%;
  border-radius: 4px;
  border: solid 1px #c9c9c9;
  font-size: 12px;
  color: #565856;
  padding-top: 10px;
  margin-bottom: 0px !important;
}

.input-placeholder {
  padding-left: 10px;
}

.input {
  background-color: transparent !important;
  border-style: none !important;
  box-shadow: inset 0px 0px 0px 0px black;
  font-weight: 600;
  font-size: 15px !important;
  padding-top: 0px;
}

.label-overlay-input {
  padding-bottom: 6px;
  padding-left: 15px;
  color: #222322;
  text-align: left;
  font-size: 15px;
}

.input:focus {
  border-style: none !important;
  box-shadow: inset 0px 0px 0px 0px black;
}

.input-label:focus-within {
  border: 1px solid #33c05b;
}

.input-sublabel {
  padding-left: 30px;
}

.help {
  font-size: 11px !important;
}
</style>
