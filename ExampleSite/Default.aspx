<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Default.aspx.vb" Inherits="ExampleSite.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <script src="Scripts/jquery-3.0.0.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="jumbotron text-center">
                <h1>Application Idea - Demo</h1>
                <p>Resize this responsive page to see the effect!</p>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <h3>Column 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adispicing elit...</p>
                        <p>Ut enim ad minim venian, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                     <div class="col-sm-3">
                        <h3>Column 2</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adispicing elit...</p>
                        <p>Ut enim ad minim venian, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                     <div class="col-sm-3">
                        <h3>Column 3</h3>
                        <p><asp:Button ID="btnCalendar" Text="Go to Calendar" runat="server" OnClick="btnCalendar_Click" /></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adispicing elit...</p>
                        <p>Ut enim ad minim venian, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
