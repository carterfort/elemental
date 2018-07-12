<?php

$csv = file_get_contents('./data.csv');
$allRows = explode("\r", $csv);
$rows = [];

foreach ($allRows as $rowString) {
    $rows[] = explode(',', $rowString);
}

$elements = [];
$symbols = $rows[1];
$names = $rows[2];

foreach ($symbols as $i => $symbol) {
    $elements[$i]['symbol'] = $symbol;
    $elements[$i]['name'] = $names[$i];
}
array_shift($rows);
array_shift($rows);
array_shift($rows);

foreach ($elements as $e => &$element) {
    $data = [];
    foreach ($rows as $j => $row) {
        $x = (float) $j + 1;
        $y = (float) $row[$e];
        if ($y) {
            $data[] = [$x, $y];
        }
    }
    $element['data'] = $data;
}
array_shift($elements);

$json = json_encode($elements, JSON_PRETTY_PRINT);

$file = 'let elements = ' . $json;

file_put_contents('./data.js', $file);
