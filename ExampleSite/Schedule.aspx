<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Schedule.aspx.vb" Inherits="ExampleSite.Schedule" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Schedule</title>

    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <script src="Scripts/jquery-3.0.0.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
       <%-- <div>
            <asp:Calendar ID="dtSchedule" runat="server"></asp:Calendar>
        </div--%>
      <div class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <h2>Calendar</h2>
                        <p><asp:Calendar ID="dtSchedule" runat="server"></asp:Calendar></p>
                        <p>Ut enim ad minim venian, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                     <div class="col-sm-3">
                        <h2>Maybe put appointments here?</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adispicing elit...</p>
                        <p>Ut enim ad minim venian, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                     <div class="col-sm-3">
                        <h2>Display notes for appointments?</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adispicing elit...</p>
                        <p>Ut enim ad minim venian, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                </div>
            </div>
    </form>
</body>
</html>
