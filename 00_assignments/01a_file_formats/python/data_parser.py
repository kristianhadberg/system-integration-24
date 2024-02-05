import csv
import json
import yaml
import xml.etree.ElementTree as ET


def parse_txt():
    with open('../me.txt', 'r') as f:
        text = f.read()
        print(text)


def parse_csv():
    with open('../me.csv', 'r') as f:
        csv_reader = csv.reader(f)
        for row in csv_reader:
            print(row)


def parse_json():
    with open('../me.json', 'r') as f:
        parsed_data = json.load(f)
        print(parsed_data)


def parse_yaml():
    with open('../me.yaml', 'r') as f:
        parsed_data = yaml.safe_load(f)
        print(parsed_data)


def parse_xml():
    root = ET.parse('../me.xml')
    parsed_dict = dict()
    for child in root.iter():
        if child.text.strip():
            parsed_dict[child.tag] = child.text
    print(parsed_dict)


parse_txt()
parse_csv()
parse_json()
parse_yaml()
parse_xml()
