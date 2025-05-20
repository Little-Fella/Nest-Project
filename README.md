<h1 align="center">КАК ЗАПУСТИТЬ BACKEND</h1>

<p>Чтобы запустить backend, нужно сделать:</p>
<ul>
  <li>Скопировать проект с гитхаба: <b>git clone https://github.com/Little-Fella/Nest-Project.git</b></li>
  <li>Зайти в папку <b>backend</b> через терминал, с помощью <b>cd</b></li>
  <li>Написать в терминале <b>npm install nest</b></li>
  <li>Перейти в папку <b>src</b> и создать там файл <b>.env</b></li>
  <li>
    Прописываетсе в .env:<br>
    <b>DB_USERNAME = postgres<br>
    DB_HOST = localhost<br>
    DB_PORT = 5432<br>
    DB_PASSWORD = Пароль от вашей базы данных из PostgreSQL<br>
    DB_DATABASE = Название вашей базы данных из PostgreSQL</b>
  </li>
</ul>

<h1 align="center">ВАЖНЫЕ GIT КОММАНДЫ</h1>

<p>Скопировать github проект себе на компьютер: <b>git clone (ссылка на репозиторий github)</b></p>
<br>
<p>Создать коммит: <b>git commit -m "Название коммита"</b></p>
<p><b>Важно! </b>Перед созданием коммита добавьте в него все измененные и новые файлы с помощью <b>git add <f>Название файла</f></b> (Можно добавить все новые файлы с помощью . вот так: git add .</p>
<br>
<p>После создание коммита, он останется у вас на компьютере, но в самом github`е изменений не будет, чтобы ваш коммит появился в github пропишите в консоли комманду: <b>git push origin main</b> (push origin прописывается всегда, а main - это имя вашей ветки, куда вы хотите добавить коммит</p>
