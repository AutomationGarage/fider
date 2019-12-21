subject: [{{ .tenantName }}] {{ .title }}
body:
<tr>
  <td>
    {{ if .duplicate }}
      <strong>{{ .title }} ({{ .postLink }})</strong> был закрыт как <strong>{{ .status }}</strong> отзыва {{ .duplicate }}.
    {{ else }}
      Статус отзыва <strong>{{ .title }} ({{ .postLink }})</strong> был изменен на <strong>{{ .status }}</strong>.
    {{ end }}
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
    {{ .view }}, {{ .unsubscribe }} or {{ .change }}.
    </span>
  </td>
</tr>