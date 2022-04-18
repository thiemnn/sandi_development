<!doctype html>
<html>
<head>
   @include('includes.head')
</head>
<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        
        @include('includes.menu')

        <!-- Layout container -->
        <div class="layout-page">
          
          @include('includes.navbar')
  
          <!-- Content wrapper -->
          <div class="content-wrapper">
            
            @yield('content')

          </div>
          <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
      </div>
  
      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    <!-- / Layout wrapper -->
  </body>
</html>