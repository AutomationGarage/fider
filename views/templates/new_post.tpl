subject: [{{ .tenantName }}] {{ .title }}
body:
<tr>
  <td>
    <strong>{{ .userName }}</strong> оставил новый отзыв <strong>{{ .title }} ({{ .postLink }})</strong>.
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
    Вы получили это сообщение, потому что вы подписаны на email-уведомления о новых отзывах. <br />
    {{ .view }} or {{ .change }}.
    </span>
  </td>
</tr>