subject: [{{ .tenantName }}] {{ .title }}
body:
<tr>
  <td>
    <strong>{{ .title }}</strong> <strong>был удалён</strong>.
  </td>
</tr>
<tr>
  <td></td>
  <td height="10" style="line-height:1px;">&nbsp;</td>
  <td></td>
</tr>
<tr>
  <td style="border-top:1px solid #efefef;">{{ .content }}</td>
</tr>
<tr>
  <td>
    <span style="color:#666;font-size:11px">
    — <br />
    Вы получили это сообщение, потому что вы подписаны на уведомления об этом отзыве. <br />
    {{ .change }}.
    </span>
  </td>
</tr>