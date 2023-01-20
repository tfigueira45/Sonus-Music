<?php
    $nome_temp = $_FILES["Arquivo"]["tmp_name"];
    $nome_real = $_FILES["Arquivo"]["name"];
    copy($nome_temp,"musics/$nome_real");
?>