import React, { useEffect, useState, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import * as d3 from 'd3';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import LocationSel from '../components/LocationSel';

Highcharts3D(Highcharts);

const Area_chart_3D = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: 'area',
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 30,
            depth: 200
          }
        },
        title: {
          text: '산맥 파노라마 시각 비교',
          align: 'left'
        },
        accessibility: {
          description: '차트는 3D로 배치된 세 개의 산맥 모양을 세 개의 영역 선 시리즈로 보여줍니다.',
          keyboardNavigation: {
            seriesNavigation: {
              mode: 'serialize'
            }
          }
        },
        lang: {
          accessibility: {
            axis: {
              xAxisDescriptionPlural: '차트에는 각 시리즈에 하나씩 세 개의 라벨이 없는 X 축이 있습니다.'
            }
          }
        },
        yAxis: {
          title: {
            text: '해발고도',
            x: -40
          },
          labels: {
            format: '{value:,.0f} MAMSL'
          },
          gridLineDashStyle: 'Dash'
        },
        xAxis: [{
          visible: false
        }, {
          visible: false
        }, {
          visible: false
        }],
        plotOptions: {
          area: {
            depth: 100,
            marker: {
              enabled: false
            },
            states: {
              inactive: {
                enabled: false
              }
            }
          }
        },
        tooltip: {
          valueSuffix: ' MAMSL'
        },
        series: [{
          name: '루시노와 폴라나에서 보이는 타트라 산맥',
          lineColor: 'rgb(180,90,50)',
          color: 'rgb(200,110,50)',
          fillColor: 'rgb(200,110,50)',
          data: [
            ['무라니', 1890],
            ['노비 비에르크', 2009],
            ['하브란', 2152],
            ['플라츠리바 스카라', 2142],
            ['샬로니 비에르크', 2061],
            ['카르츠마르스키 비에르크', 1438],
            ['자가녜츠 스지트', 2230],
            ['체르보나 투르니아', 2284],
            ['코워비 스지트', 2418],
            ['차르니 스지트', 2429],
            ['바라니 로기', 2526],
            ['스녜즈니 스지트', 2465],
            ['로도비 스지트', 2627],
            ['로도바 코파', 2602],
            ['셰로카 야보지니스카', 2210],
            ['호르바키 비에르크', 1902],
            ['스피스미하워바 츄바', 2012],
            ['지엘로나 츄바', 2130],
            ['비엘리츠키 스지트', 2318],
            ['게를라흐', 2655],
            ['바티조비에츠키 스지트', 2448],
            ['카치 스지트', 2395],
            ['즈마르즐리 스지트', 2390],
            ['콘치스타', 2538],
            ['므워나르즈', 2170],
            ['가넥', 2462],
            ['비소카', 2547],
            ['체츠키 스지트', 2520],
            ['르시', 2503],
            ['자비 미니히', 2146],
            ['자비 콘', 2291],
            ['자비아 투르니아 미엥구소비에츠카', 2335],
            ['워워바 투르니아', 2373]
          ]
        }, {
          xAxis: 1,
          lineColor: 'rgb(120,160,180)',
          color: 'rgb(140,180,200)',
          fillColor: 'rgb(140,180,200)',
          name: '크리펜슈타인에서 본 다흐슈타인 파노라마',
          data: [
            ['쿠프슈타인', 2049],
            ['호헤 빌트슈텔레', 2746],
            ['클라이너 미즈베르크', 2173],
            ['그로서 미즈베르크', 2202],
            ['호크슈타인', 2543],
            ['라크너 미즈베르크', 2232],
            ['바센스피체', 2257],
            ['시나벨', 2349],
            ['페이스터 샤르테', 2198],
            ['에셀슈타인', 2556],
            ['란프리드슈타인', 2536],
            ['샤이헨스피츠', 2667],
            ['슈미드슈토크', 2634],
            ['감스펠트슈피체', 2611],
            ['에델그리스트', 2305],
            ['코펜카르슈타인', 2863],
            ['니데러 가이드슈타인', 2483],
            ['호허 가이드슈타인', 2794],
            ['호허 다흐슈타인', 2995],
            ['니데러 다흐슈타인', 2934],
            ['호헤스 크로이츠', 2837],
            ['호허 옥센코겔', 2513]
          ]
        }, {
          xAxis: 2,
          lineColor: 'rgb(200, 190, 140)',
          color: 'rgb(200, 190, 140)',
          fillColor: 'rgb(230, 220, 180)',
          name: '콜 데스 미네스에서 본 파노라마',
          data: [
            ['콤빈 드 라 체세테', 4141],
            ['그랑 콤빈 드 그라페네이레', 4314],
            ['콤빈 드 코르바시에레', 3716],
            ['쁘띠 콤빈', 3672],
            ['푸앵트 드 보베르', 3212],
            ['그랑 아제', 3133],
            ['몽 로뉴', 3084],
            ['덴트 뒤 그랑 레', 2884],
            ['몽 텔리에', 2951],
            ['그랑 골리아트', 3238],
            ['몽 그랑 로셰', 3326],
            ['몽 드 라 푸리', 2871],
            ['테트 드 라 파얀느', 2452],
            ['푸앵트 알로브로기아', 3172],
            ['시 블랑', 2334],
            ['몽 돌렌트', 3820],
            ['아이글 두 트리올레', 3870],
            ['르 투르 누아르', 3836],
            ['아이글 드 라 뇌브', 3753],
            ['아이글 다르장티에르', 3900],
            ['아이글 뒤 샤르도네', 3824],
            ['아이글 뒤 투르', 3540],
            ['아이글 뒤 피수아르', 3440],
            ['르 카토뉴', 2598],
            ['푸앵트 드 프로솜', 2762],
            ['푸앵트 론드', 2700],
            ['몽 뷔에', 3096],
            ['르 슈발 블랑', 2831],
            ['푸앵트 드 라 피니브', 2838],
            ['피크 드 테네베르주', 2985],
            ['푸앵트 다보이용', 2819],
            ['투르 살리에르', 3220],
            ['르 돔', 3138],
            ['오트 시메', 3257],
            ['피에르 아부아', 2473],
            ['시메 드 레스트', 3178]
          ]
        }]
      });
    }
  }, []);

  return (
    <div className='w-full p-3 flex flex-col items-center'>
      <div className='mt-10 mb-7 font-bold text-2xl w-full'>이상탐지 알림 기준</div>
      <div className='w-[90%] mb-3'>
        <LocationSel onChange={setSelectedLocation} className="min-w-[300px]" />
      </div>
      <div id="container" ref={chartRef} className="w-full h-[500px]"></div>
    </div>
  );
};

export default Area_chart_3D;
