Public Class WebForm1
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Protected Sub btnCalendar_Click(sender As Object, e As EventArgs) Handles btnCalendar.Click
        Response.Redirect("Schedule.aspx")
    End Sub
End Class