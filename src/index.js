import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// For local development with `npm start`
const params = window.customPupeteerParams ?? JSON.stringify({
  slug: 'hosts_changed_by_job_template',
  data: {
    "response_type": "hosts_by_date_and_template",
    "meta": {
      "count": 246,
      "legend": [
        {
          "id": 16482,
          "name": "Scan Job Template",
          "total_template_count": 1,
          "total_unique_host_count": 586,
          "total_count": 1001,
          "total_unique_host_changed_count": 0
        },
        {
          "id": 3926,
          "name": "Ping Test",
          "total_template_count": 1,
          "total_unique_host_count": 114,
          "total_count": 352,
          "total_unique_host_changed_count": 0
        },
        {
          "id": 36161,
          "name": "TEst_Collections",
          "total_template_count": 1,
          "total_unique_host_count": 96,
          "total_count": 103,
          "total_unique_host_changed_count": 4
        },
        {
          "id": 31,
          "name": "Test",
          "total_template_count": 1,
          "total_unique_host_count": 95,
          "total_count": 218,
          "total_unique_host_changed_count": 3
        },
        {
          "id": 35394,
          "name": "RHEL System Roles",
          "total_template_count": 1,
          "total_unique_host_count": 93,
          "total_count": 100,
          "total_unique_host_changed_count": 1
        },
        {
          "id": 38946,
          "name": "vCenter",
          "total_template_count": 1,
          "total_unique_host_count": 39,
          "total_count": 78,
          "total_unique_host_changed_count": 0
        },
        {
          "total_template_count": 240,
          "total_unique_host_count": 262,
          "total_count": 72697,
          "total_unique_host_changed_count": 127,
          "id": -1,
          "name": "240 Others"
        }
      ]
    },
    "dates": [
      {
        "date": "2021-03-01",
        "items": [
          {
            "id": 16482,
            "name": "Scan Job Template",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 3926,
            "name": "Ping Test",
            "total_template_count": 1,
            "total_unique_host_count": 2,
            "total_count": 4,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 36161,
            "name": "TEst_Collections",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 31,
            "name": "Test",
            "total_template_count": 1,
            "total_unique_host_count": 3,
            "total_count": 122,
            "total_unique_host_changed_count": 3
          },
          {
            "id": 35394,
            "name": "RHEL System Roles",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 38946,
            "name": "vCenter",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "total_template_count": 64,
            "total_unique_host_count": 67,
            "total_count": 12900,
            "total_unique_host_changed_count": 30,
            "id": -1,
            "name": "64 Others"
          }
        ]
      },
      {
        "date": "2021-04-01",
        "items": [
          {
            "id": 16482,
            "name": "Scan Job Template",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 3926,
            "name": "Ping Test",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 36161,
            "name": "TEst_Collections",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 31,
            "name": "Test",
            "total_template_count": 1,
            "total_unique_host_count": 93,
            "total_count": 96,
            "total_unique_host_changed_count": 1
          },
          {
            "id": 35394,
            "name": "RHEL System Roles",
            "total_template_count": 1,
            "total_unique_host_count": 93,
            "total_count": 100,
            "total_unique_host_changed_count": 1
          },
          {
            "id": 38946,
            "name": "vCenter",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "total_template_count": 70,
            "total_unique_host_count": 86,
            "total_count": 12704,
            "total_unique_host_changed_count": 46,
            "id": -1,
            "name": "70 Others"
          }
        ]
      },
      {
        "date": "2021-05-01",
        "items": [
          {
            "id": 16482,
            "name": "Scan Job Template",
            "total_template_count": 1,
            "total_unique_host_count": 3,
            "total_count": 48,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 3926,
            "name": "Ping Test",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 36161,
            "name": "TEst_Collections",
            "total_template_count": 1,
            "total_unique_host_count": 96,
            "total_count": 103,
            "total_unique_host_changed_count": 4
          },
          {
            "id": 31,
            "name": "Test",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 35394,
            "name": "RHEL System Roles",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 38946,
            "name": "vCenter",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "total_template_count": 63,
            "total_unique_host_count": 45,
            "total_count": 12859,
            "total_unique_host_changed_count": 27,
            "id": -1,
            "name": "63 Others"
          }
        ]
      },
      {
        "date": "2021-06-01",
        "items": [
          {
            "id": 16482,
            "name": "Scan Job Template",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 3926,
            "name": "Ping Test",
            "total_template_count": 1,
            "total_unique_host_count": 112,
            "total_count": 236,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 36161,
            "name": "TEst_Collections",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 31,
            "name": "Test",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 35394,
            "name": "RHEL System Roles",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 38946,
            "name": "vCenter",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "total_template_count": 63,
            "total_unique_host_count": 42,
            "total_count": 12170,
            "total_unique_host_changed_count": 22,
            "id": -1,
            "name": "63 Others"
          }
        ]
      },
      {
        "date": "2021-07-01",
        "items": [
          {
            "id": 16482,
            "name": "Scan Job Template",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 3926,
            "name": "Ping Test",
            "total_template_count": 1,
            "total_unique_host_count": 112,
            "total_count": 112,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 36161,
            "name": "TEst_Collections",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 31,
            "name": "Test",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 35394,
            "name": "RHEL System Roles",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 38946,
            "name": "vCenter",
            "total_template_count": 1,
            "total_unique_host_count": 39,
            "total_count": 78,
            "total_unique_host_changed_count": 0
          },
          {
            "total_template_count": 75,
            "total_unique_host_count": 77,
            "total_count": 12633,
            "total_unique_host_changed_count": 33,
            "id": -1,
            "name": "75 Others"
          }
        ]
      },
      {
        "date": "2021-08-01",
        "items": [
          {
            "id": 16482,
            "name": "Scan Job Template",
            "total_template_count": 1,
            "total_unique_host_count": 585,
            "total_count": 953,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 3926,
            "name": "Ping Test",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 36161,
            "name": "TEst_Collections",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 31,
            "name": "Test",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 35394,
            "name": "RHEL System Roles",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "id": 38946,
            "name": "vCenter",
            "total_template_count": 0,
            "total_unique_host_count": 0,
            "total_count": 0,
            "total_unique_host_changed_count": 0
          },
          {
            "total_template_count": 66,
            "total_unique_host_count": 61,
            "total_count": 9431,
            "total_unique_host_changed_count": 36,
            "id": -1,
            "name": "66 Others"
          }
        ]
      }
    ]
  },
  label: 'Total unique hosts',
  y: 'total_unique_host_count',
  xTickFormat: 'formatDateAsDayMonth',
  pageWidth: 1200,
  pageHeight: 1000,
});

ReactDOM.render(
  <App {...JSON.parse(params)} />,
  document.getElementById('root')
);
