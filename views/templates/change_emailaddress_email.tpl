subject: Подтвердите ваш новый email
body:
<tr>
  <td>
    <p>Здравствуйте <strong>{{ .name }}</strong>,</p>
    <p>Вы попросили поменять ваш email с {{ .oldEmail }} на {{ .newEmail }}.</p>
    <p>Для подтверждения, нажмите на ссылку ниже.</p>
  </td>
</tr>
<tr>
  <td>{{ .link }}</td>
</tr>
<tr>
  <td>
    <span style="color:#666;font-size:11px"></span>Эта ссылка может быть использована в течение 24 часов и только один раз.</span>
  </td>
</tr>