(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import natural from 'natural';

var FeedItem = function (_Component) {
  _inherits(FeedItem, _Component);

  function FeedItem() {
    _classCallCheck(this, FeedItem);

    return _possibleConstructorReturn(this, (FeedItem.__proto__ || Object.getPrototypeOf(FeedItem)).apply(this, arguments));
  }

  _createClass(FeedItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'feed-item' },
        _react2.default.createElement(
          'div',
          { className: 'date' },
          'Posted on ',
          this.props.published,
          ' / ',
          this.props.source
        ),
        _react2.default.createElement(
          'div',
          { className: 'text' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'a',
              { href: '#', onClick: function onClick() {
                  return _this2.props.onclick(_this2.props.key);
                } },
              _react2.default.createElement(
                'strong',
                null,
                this.props.title
              )
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            this.props.content.replace(/<[^>]+>/ig, '')
          )
        )
      );
    }
  }]);

  return FeedItem;
}(_react.Component);

var App = function (_Component2) {
  _inherits(App, _Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this3.state = { activeScreen: 'latest', selected: null };
    return _this3;
  }

  _createClass(App, [{
    key: 'handleFeedItemClick',
    value: function handleFeedItemClick(key) {
      alert(key);
      this.setState({ selected: key });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var feed = _data2.default.items.map(function (item, index) {
        return _react2.default.createElement(FeedItem, {
          key: index.toString(),
          onclick: _this4.handleFeedItemClick,
          title: item.title,
          source: _data2.default.feed.title,
          content: item.content,
          published: item.pubDate });
      });

      return _react2.default.createElement(
        'div',
        { className: 'App' },
        _react2.default.createElement(
          'h2',
          null,
          'News Feed'
        ),
        _react2.default.createElement(
          'h1',
          null,
          this.state.selected
        ),
        _react2.default.createElement(
          'div',
          { className: 'activity-feed' },
          feed
        )
      );
    }
  }]);

  return App;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./data":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var data = { "status": "ok", "feed": { "url": "http://www.dailymirror.lk/RSS_Feeds/breaking-news", "title": "dailymirror.lk", "link": "http://dailymirror.lk/RSS_Feeds/breaking-news", "author": "rangazone.r@gmail.com", "description": "The only Sri Lankan newspaper with round the clock news updates - Dailymirror Online Edition", "image": "" }, "items": [{ "title": "Import of Prado vehicles: Govt. loses Rs.3,000 mln in taxes: COPA", "pubDate": "2017-06-24 08:30:18", "link": "http://www.dailymirror.lk/131529/Import-of-Prado-vehicles-Govt-loses-Rs-mln-in-taxes-COPA", "guid": "http://www.dailymirror.lk/131529/Import-of-Prado-vehicles-Govt-loses-Rs-mln-in-taxes-COPA", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>The government has lost Rs.3,000 million by way of taxes in the importation of 407 Prado vehicles in 2016, the Committee on Public Accounts (COPA) revealed in its report presented to Parliament yesterday.</p>", "content": "<p>The government has lost Rs.3,000 million by way of taxes in the importation of 407 Prado vehicles in 2016, the Committee on Public Accounts (COPA) revealed in its report presented to Parliament yesterday.</p>", "enclosure": [], "categories": [] }, { "title": "NFTH will be a dengue treatment centre: Kiriella", "pubDate": "2017-06-24 06:15:12", "link": "http://www.dailymirror.lk/131530/NFTH-will-be-a-dengue-treatment-centre-Kiriella", "guid": "http://www.dailymirror.lk/131530/NFTH-will-be-a-dengue-treatment-centre-Kiriella", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>House Leader and Higher Education Minister Lakshman Kiriella said yesterday the Neville Fernando Teaching Hospital (NFTH) would be taken over by the government and turned it into a dengue treatment centre.</p>", "content": "<p>House Leader and Higher Education Minister Lakshman Kiriella said yesterday the Neville Fernando Teaching Hospital (NFTH) would be taken over by the government and turned it into a dengue treatment centre.</p>", "enclosure": [], "categories": [] }, { "title": "Undocumented bond sales: Rs.1,043 bln up to 2015: COPA", "pubDate": "2017-06-23 23:11:39", "link": "http://www.dailymirror.lk/131528/Undocumented-bond-sales-Rs-bln-up-to-COPA", "guid": "http://www.dailymirror.lk/131528/Undocumented-bond-sales-Rs-bln-up-to-COPA", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>There has been undocumented bond sales by various government and semi government institutions worth worth Rs.1,043 billion up to 2015, the Committee on Public Accounts (COPA) said in its report submitted Parliament today.</p>", "content": "<p>There has been undocumented bond sales by various government and semi government institutions worth worth Rs.1,043 billion up to 2015, the Committee on Public Accounts (COPA) said in its report submitted Parliament today.</p>", "enclosure": [], "categories": [] }, { "title": "Health services at standstill for second day", "pubDate": "2017-06-23 21:01:08", "link": "http://www.dailymirror.lk/131527/Health-services-at-standstill-for-second-day", "guid": "http://www.dailymirror.lk/131527/Health-services-at-standstill-for-second-day", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Healthcare services countrywide came to standstill today as a result of the work stoppage by the members of the Government Medical Officers Association (GMOA) over the SAITM issue.</p>", "content": "<p>Healthcare services countrywide came to standstill today as a result of the work stoppage by the members of the Government Medical Officers Association (GMOA) over the SAITM issue.</p>", "enclosure": [], "categories": [] }, { "title": "Less people using buses now: LPBOA", "pubDate": "2017-06-23 19:20:56", "link": "http://www.dailymirror.lk/131525/Less-people-using-buses-now-LPBOA", "guid": "http://www.dailymirror.lk/131525/Less-people-using-buses-now-LPBOA", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>The number of people travelling in buses have dropped by about 1,500 because of the increase in bus fares, Lanka Private Bus Owners Association (LPBOA) President Gemunu Wijeratne said today.</p>", "content": "<p>The number of people travelling in buses have dropped by about 1,500 because of the increase in bus fares, Lanka Private Bus Owners Association (LPBOA) President Gemunu Wijeratne said today.</p>", "enclosure": [], "categories": [] }, { "title": "Dr. Saman Kelegama passes away", "pubDate": "2017-06-23 16:14:36", "link": "http://www.dailymirror.lk/131522/Dr-Saman-Kelegama-passes-away", "guid": "http://www.dailymirror.lk/131522/Dr-Saman-Kelegama-passes-away", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Dr. Saman Kelegama, the Executive Director of the Institute of Policy Studies of Sri Lanka, has passed away at the age of 58 in Thailand today, Sri Lankan Embassy in Thailand confirmed.  </p>", "content": "<p>Dr. Saman Kelegama, the Executive Director of the Institute of Policy Studies of Sri Lanka, has passed away at the age of 58 in Thailand today, Sri Lankan Embassy in Thailand confirmed.  </p>", "enclosure": [], "categories": [] }, { "title": "Rajiv Gandhi assassin seeks mercy killing", "pubDate": "2017-06-23 14:22:26", "link": "http://www.dailymirror.lk/131518/Rajiv-Gandhi-assassin-seeks-mercy-killing", "guid": "http://www.dailymirror.lk/131518/Rajiv-Gandhi-assassin-seeks-mercy-killing", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Robert Pious, one of the convicts in Rajiv Gandhi assassination case, has appealed for euthanasia, the Indian Express reported yesterday.</p>", "content": "<p>Robert Pious, one of the convicts in Rajiv Gandhi assassination case, has appealed for euthanasia, the Indian Express reported yesterday.</p>", "enclosure": [], "categories": [] }, { "title": "Police Media Spokesman resigns", "pubDate": "2017-06-23 13:29:33", "link": "http://www.dailymirror.lk/131506/Police-Media-Spokesman-resigns-", "guid": "http://www.dailymirror.lk/131506/Police-Media-Spokesman-resigns-", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Police Media Spokesman DIG Priyantha Jayakody in a Facebook post said he had decided to resign from his post due to his prevailing medical condition.</p>", "content": "<p>Police Media Spokesman DIG Priyantha Jayakody in a Facebook post said he had decided to resign from his post due to his prevailing medical condition.</p>", "enclosure": [], "categories": [] }, { "title": "IUSF Convener taken into custody", "pubDate": "2017-06-23 12:39:36", "link": "http://www.dailymirror.lk/131504/IUSF-Convener-taken-into-custody", "guid": "http://www.dailymirror.lk/131504/IUSF-Convener-taken-into-custody", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Inter University Students Federation (IUSF) Convener Lahiru Weerasekara was taken into police custody today. Sources said he was taken into custody along with another IUSF member as they were leaving the Centre for Society and Religion (CSR) in Maradana after a news conference.</p>", "content": "<p>Inter University Students Federation (IUSF) Convener Lahiru Weerasekara was taken into police custody today. Sources said he was taken into custody along with another IUSF member as they were leaving the Centre for Society and Religion (CSR) in Maradana after a news conference.</p>", "enclosure": [], "categories": [] }, { "title": "Heavy traffic on Colombo- Kandy road due to accident", "pubDate": "2017-06-23 11:23:21", "link": "http://www.dailymirror.lk/131492/Heavy-traffic-on-Colombo-Kandy-road-due-to-accident", "guid": "http://www.dailymirror.lk/131492/Heavy-traffic-on-Colombo-Kandy-road-due-to-accident", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "\n<p></p>\n\n<p>Heavy traffic was reported onthe Colombo-Kandy Main Road at Kegalle this morning following an accident involving a container truck, a bus and a three-wheeler.</p>\n", "content": "\n<p></p>\n\n<p>Heavy traffic was reported onthe Colombo-Kandy Main Road at Kegalle this morning following an accident involving a container truck, a bus and a three-wheeler.</p>\n", "enclosure": [], "categories": [] }, { "title": "Time to rethink liquor sale on Poya Days: Mangala", "pubDate": "2017-06-23 10:15:20", "link": "http://www.dailymirror.lk/131473/Time-to-rethink-liquor-sale-on-Poya-Days-Mangala", "guid": "http://www.dailymirror.lk/131473/Time-to-rethink-liquor-sale-on-Poya-Days-Mangala", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>The time has come for the country to rethink banning of liquor sales on Poya Days, Finance and Mass Media Minister Mangala Samaraweera told Parliament yesterday.Speaking during a debate on the notifications made under Excise Ordinance in the House, the Minister said liquor sales were higher on Poya Days tha</p>", "content": "<p>The time has come for the country to rethink banning of liquor sales on Poya Days, Finance and Mass Media Minister Mangala Samaraweera told Parliament yesterday.Speaking during a debate on the notifications made under Excise Ordinance in the House, the Minister said liquor sales were higher on Poya Days tha</p>", "enclosure": [], "categories": [] }, { "title": "Serial garbage dumpers warned: You are being watched!", "pubDate": "2017-06-23 09:50:04", "link": "http://www.dailymirror.lk/131490/Serial-garbage-dumpers-warned-You-are-being-watched-", "guid": "http://www.dailymirror.lk/131490/Serial-garbage-dumpers-warned-You-are-being-watched-", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Street cameras will be set up to identify persons who dump garbage on the roadside and in public places, Minister of Provincial Councils and Local Government Faiszer Musthapha said.</p>", "content": "<p>Street cameras will be set up to identify persons who dump garbage on the roadside and in public places, Minister of Provincial Councils and Local Government Faiszer Musthapha said.</p>", "enclosure": [], "categories": [] }, { "title": "People don’t dump garbage at allocated places: CMC", "pubDate": "2017-06-23 08:30:49", "link": "http://www.dailymirror.lk/131463/People-don-t-dump-garbage-at-allocated-places-CMC", "guid": "http://www.dailymirror.lk/131463/People-don-t-dump-garbage-at-allocated-places-CMC", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "\n<p>Though the Colombo Municipal Council collected garbage on a regular basis, people did not dump garbage at allocated places making the process of garbage collecting cumbersome, CMC Commissioner V. K. A. Anura said yesterday.</p>\n\n<p> </p>\n", "content": "\n<p>Though the Colombo Municipal Council collected garbage on a regular basis, people did not dump garbage at allocated places making the process of garbage collecting cumbersome, CMC Commissioner V. K. A. Anura said yesterday.</p>\n\n<p> </p>\n", "enclosure": [], "categories": [] }, { "title": "What were police doing?: PM", "pubDate": "2017-06-23 06:20:28", "link": "http://www.dailymirror.lk/131460/What-were-police-doing-PM", "guid": "http://www.dailymirror.lk/131460/What-were-police-doing-PM", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Prime Minister Ranil Wickremesinghe has informed the Ministry of Law and Order and Southern Development to report back to him just how university students were able to climb four storeys into the Ministry of Health building without the police being able to stop them.</p>", "content": "<p>Prime Minister Ranil Wickremesinghe has informed the Ministry of Law and Order and Southern Development to report back to him just how university students were able to climb four storeys into the Ministry of Health building without the police being able to stop them.</p>", "enclosure": [], "categories": [] }, { "title": "I will not blame Uni students for political conspiracies: Prez", "pubDate": "2017-06-23 05:12:30", "link": "http://www.dailymirror.lk/131459/I-will-not-blame-Uni-students-for-political-conspiracies-Prez", "guid": "http://www.dailymirror.lk/131459/I-will-not-blame-Uni-students-for-political-conspiracies-Prez", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>I will not put the blame for conspiracies launched in an uncivilized political climate on university students, said President Maithripala Sirisena in Polonnaruwa yesterday.</p>", "content": "<p>I will not put the blame for conspiracies launched in an uncivilized political climate on university students, said President Maithripala Sirisena in Polonnaruwa yesterday.</p>", "enclosure": [], "categories": [] }, { "title": "Cuppa leaves GMOA doctor in hospital", "pubDate": "2017-06-23 03:42:47", "link": "http://www.dailymirror.lk/131458/Cuppa-leaves-GMOA-doctor-in-hospital", "guid": "http://www.dailymirror.lk/131458/Cuppa-leaves-GMOA-doctor-in-hospital", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>A doctor of the Government Medical Officers Association (GMOA) was admitted to the National Hospital last evening with injuries to his nose after being hit on the face by a cup thrown at him by a fellow doctor during a forum held at the Sri Lanka Foundation Institute (SLFI) over the SAITM issue.</p>", "content": "<p>A doctor of the Government Medical Officers Association (GMOA) was admitted to the National Hospital last evening with injuries to his nose after being hit on the face by a cup thrown at him by a fellow doctor during a forum held at the Sri Lanka Foundation Institute (SLFI) over the SAITM issue.</p>", "enclosure": [], "categories": [] }, { "title": "Dinesh says Speaker promised them a debate", "pubDate": "2017-06-22 23:30:22", "link": "http://www.dailymirror.lk/131462/Dinesh-says-Speaker-promised-them-a-debate", "guid": "http://www.dailymirror.lk/131462/Dinesh-says-Speaker-promised-them-a-debate", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<div font-size:=\"\" times=\"\">\n<p><span font-size:=\"\" text-align:=\"\" times=\"\">Joint opposition MP Dinesh Gunawardane said yesterday that Speaker Karu Jayasuriya had assured them that the adjournment debate on the attack on university students and the GMOA strike would be held today whereas it was cancelled due to the early adjournment of the Hous</span></p>\n</div>", "content": "<div font-size:=\"\" times=\"\">\n<p><span font-size:=\"\" text-align:=\"\" times=\"\">Joint opposition MP Dinesh Gunawardane said yesterday that Speaker Karu Jayasuriya had assured them that the adjournment debate on the attack on university students and the GMOA strike would be held today whereas it was cancelled due to the early adjournment of the Hous</span></p>\n</div>", "enclosure": [], "categories": [] }, { "title": "Kiriella adamant Dinesh should have been present", "pubDate": "2017-06-22 22:36:32", "link": "http://www.dailymirror.lk/131461/Kiriella-adamant-Dinesh-should-have-been-present", "guid": "http://www.dailymirror.lk/131461/Kiriella-adamant-Dinesh-should-have-been-present", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>The Government cannot be expected to go out of their way all the time to allow the joint opposition to move adjournment motions as and when they want, Leader of the House Lakshman Kiriella said today.</p>", "content": "<p>The Government cannot be expected to go out of their way all the time to allow the joint opposition to move adjournment motions as and when they want, Leader of the House Lakshman Kiriella said today.</p>", "enclosure": [], "categories": [] }, { "title": "Malinga investigated over 'monkey' remark", "pubDate": "2017-06-22 21:45:30", "link": "http://www.dailymirror.lk/131445/Malinga-investigated-over-monkey-remark", "guid": "http://www.dailymirror.lk/131445/Malinga-investigated-over-monkey-remark", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Fast bowler Lasith Malinga is being investigated by Sri Lanka's cricket board after comparing the country's sports minister to a monkey, the BBC reported.</p>", "content": "<p>Fast bowler Lasith Malinga is being investigated by Sri Lanka's cricket board after comparing the country's sports minister to a monkey, the BBC reported.</p>", "enclosure": [], "categories": [] }, { "title": "Need to reform Muslim Marriage Law; Muslim Leaders tell Keshap", "pubDate": "2017-06-22 21:06:41", "link": "http://www.dailymirror.lk/131446/Need-to-reform-Muslim-Marriage-Law-Muslim-Leaders-tell-Keshap", "guid": "http://www.dailymirror.lk/131446/Need-to-reform-Muslim-Marriage-Law-Muslim-Leaders-tell-Keshap", "author": "rangazone.r@gmail.com", "thumbnail": "", "description": "<p>Muslim community leaders had stressed the importance of amending the 1951 Muslim Marriage and Divorce Act when they met with US Ambassador Atul Keshap late last week, the US Embassy said in a statement.</p>", "content": "<p>Muslim community leaders had stressed the importance of amending the 1951 Muslim Marriage and Divorce Act when they met with US Ambassador Atul Keshap late last week, the US Embassy said in a statement.</p>", "enclosure": [], "categories": [] }] };

exports.default = data;

},{}]},{},[1]);
