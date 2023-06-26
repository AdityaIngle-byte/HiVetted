export const resumeStyle = `
    <style>
    /* Reset */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    
    /* resume template styles */
    .resumeTemplateBody {
      /* technically considering this class as the body tag */
      margin: 0;
      padding: 0;
      font-family: "Noto Sans", sans-serif;
      font-weight: 400;
      font-size: 62.5%;
      scroll-behavior: smooth;
    }
    /* global style */
    /* colors */
    :root {
      --color-brand-coral: #ff5f57;
      --color-brand-blue: #001b38;
      --text-color: #1b1b1b;
      --text-color-lightGrey: #767676;
      --text-color-lightGrey2: #99a4af;
      --border-color: #cccccc;
      --light-grey: #f1f1f1;
      --bg-grey: #ededed;
      --color-white: #fff;
    }
    /* colors */
    /* typography */
    .resumeTemplateBody h1,
    .resumeTemplateBody h2,
    .resumeTemplateBody h3,
    .resumeTemplateBody h4,
    .resumeTemplateBody h5,
    .resumeTemplateBody h6,
    .resumeTemplateBody p {
      line-height: 1.5;
      margin: 0;
    }
    .resumeTemplateBody ul li {
      font-size: 16px;
      color: var(--text-color-lightGrey);
    }
    .font--regular {
      font-weight: 400;
    }
    .font--bold {
      font-weight: 700;
    }
    .heading1 {
      font-size: 5.5em;
    }
    .heading2 {
      font-size: 3.5em;
    }
    .heading3 {
      font-size: 2.5em;
    }
    .paragraphStyle {
      font-size: 16px;
    }
    .color--coral {
      color: var(--color-brand-coral);
    }
    .color--brandBlue {
      color: var(--color-brand-blue);
    }
    .color--text {
      color: var(--text-color);
    }
    .color--textLightGrey {
      color: var(--text-color-lightGrey);
    }
    .color--textLightGrey2 {
      color: var(--text-color-lightGrey2);
    }
    .color--white {
      color: var(--color-white);
    }
    /* typography */
    /* setting resuable css */
    /* margins */
    .resumeTemplateBody .mt5 {
      margin-top: 5px;
    }
    .resumeTemplateBody .mt10 {
      margin-top: 10px;
    }
    .resumeTemplateBody .mt20 {
      margin-top: 20px;
    }
    .resumeTemplateBody .mt30 {
      margin-top: 30px;
    }
    .resumeTemplateBody .mt40 {
      margin-top: 40px;
    }
    .resumeTemplateBody .mt50 {
      margin-top: 50px;
    }
    .resumeTemplateBody .mt80 {
      margin-top: 80px;
    }
    .resumeTemplateBody .mb10 {
      margin-bottom: 10px;
    }
    .resumeTemplateBody .mb20 {
      margin-bottom: 20px;
    }
    .resumeTemplateBody .mb30 {
      margin-bottom: 30px;
    }
    .resumeTemplateBody .mb40 {
      margin-bottom: 40px;
    }
    .resumeTemplateBody .mb50 {
      margin-bottom: 50px;
    }
    .resumeTemplateBody .mb60 {
      margin-bottom: 60px;
    }
    /* end of margins */
    .bg--coral {
      background-color: var(--color-brand-coral);
    }
    .bg--brandBlue {
      background-color: var(--color-brand-blue);
    }
    .bg--white {
      background-color: var(--color-white);
    }
    .bg--Grey {
      background-color: var(--bg-grey);
    }
    .borderRadius100 {
      border-radius: 100%;
    }
    .position--relative {
      position: relative;
    }
    .afterClass::after,
    .beforeClass::before {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
    }
    .beforeClass::before {
      right: unset;
      left: 0;
    }
    .displayBlock {
      display: block;
    }
    .displayInlineBlock {
      display: inline-block;
    }
    .displayFlex {
      display: flex;
    }
    .flexWrap {
      flex-wrap: wrap;
    }
    .alignItemsCenter {
      align-items: center;
    }
    .justifyContentCenter {
      justify-content: center;
    }
    .justifyContentBetween {
      justify-content: space-between;
    }
    .justifyContentAround {
      justify-content: space-around;
    }
    .circularIcon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
    }
    .circularIcon img {
      width: 24px;
    }
    .bottomBorderStyle {
      height: 2px;
      width: 99px;
    }
    .skillTags {
      padding: 8px 15px;
      border: 1px solid var(--color-brand-blue);
      border-radius: 4px;
      font-size: 16px;
      display: inline-block;
      margin: 5px;
    }
    .centerContainer-xxxl {
      max-width: 1550px;
      margin-left: auto;
      margin-right: auto;
    }
    .relativeElement {
      position: relative;
      z-index: 222;
    }
    .floatRight {
      float: right;
    }
    .clearFix {
      clear: both;
    }
    .displayBlock {
      display: block;
    }
    .paddingTopZero {
      padding-top: 0 !important;
    }
    /* end of setting resuable css */
    
    .resumeTemplateBody__inner,
    .resumeTemplateBody__innerCopy {
      /* setting document padding */
      padding: 75px 150px;
    }
    .template2Body {
      padding: 40px 50px;
    }
    .resumeRow {
      display: flex;
    }
    .resumeColumn30,
    .resumeColumn70 {
      padding-left: 15px;
      padding-right: 15px;
    }
    .resumeColumn30 {
      width: 30%;
    }
    .resumeColumn70 {
      width: 70%;
    }
    .innerRow {
      margin-bottom: 30px;
    }
    .innerRow:last-child {
      margin-bottom: 0;
    }
    .resumeColumn70__inneContainer50 {
      width: 50%;
      margin: 10px 0px;
    }
    .resumeColumn70__inneContainer100 {
      width: 100%;
      margin-bottom: 30px;
    }
    .textAlignCenter {
      text-align: center;
    }
    .marginHorizontalAuto {
      margin-left: auto;
      margin-right: auto;
    }
    .displayBlock-sm {
      display: none;
    }
    .flexWidth50 {
      width: 50%;
    }
    .flexWidth25 {
      width: 25%;
    }
    .flexColumn {
      flex-direction: column;
    }
    .marginRight10p {
      margin-right: 10px;
    }
    .displayBlock-md {
      display: none;
    }
    .verticalMiddle {
      vertical-align: middle;
    }
    .customUnOrderdList {
      list-style: none;
      padding: 0;
    }
    .customUnOrderdList li {
      position: relative;
      padding-left: 25px;
      color: var(--text-color) !important;
      margin-bottom: 10px;
    }
    .customUnOrderdList li::before {
      content: "";
      background-color: var(--color-black);
      width: 14px;
      height: 14px;
      border-radius: 100%;
      position: absolute;
      left: 0;
      top: 4px;
    }
    .customUnOrderdList--coral li::before {
      background-color: var(--color-brand-coral);
    }
    .paddingLeftZero {
      padding-left: 0 !important;
    }
    .paddingRightZero {
      padding-right: 0 !important;
    }
    .flexWidth60 {
      width: 60%;
    }
    .flexWidth59 {
      width: 59%;
    }
    .flexWidth40 {
      width: 40%;
    }
    .flexWidth41 {
      width: 41%;
    }
    /* global style */
    
    /* template 1 */
    /* template 1 header */
    .resumeDocumentBody__header::before {
      width: 150px;
      height: 150px;
      background-color: var(--color-brand-coral);
      border-radius: 100%;
    }
    .resumeDocumentBody__header,
    .userContactInfo {
      padding-left: 82px;
    }
    .borderLineDiv {
      width: 80%;
      height: 1px;
      background-color: var(--border-color);
    }
    .borderLineDiv::before {
      width: 20px;
      height: 100%;
      background-color: var(--color-white);
    }
    .resumeDocumentBody__header__contactInfo {
      width: 82%;
    }
    .titleAndText {
      margin-left: 12px;
    }
    .titleAndText .color--textLightGrey.displayBlock {
      word-break: break-all;
    }
    .contactInfo__inner__item {
      width: 30%;
      margin: 10px;
    }
    .userAvatarAndIntro img {
      width: 170px;
      height: 170px;
      object-fit: cover;
      padding-right: 15px;
    }
    .yearsAndCompany {
      width: 20.6%;
      padding-right: 15px;
    }
    .yearsAndCompanySummary {
      width: 79.4%;
    }
    .border-top-Column {
      border-top: 1px solid var(--border-color);
      padding-top: 30px;
    }
    .thankyouDiv {
      padding: 50px 0px;
      margin-top: 100px;
      background-color: var(--light-grey);
    }
    .introSwap {
      flex-direction: column;
    }
    /* template 1 */
    
    /* template 2 */
    .template2AvatarName img {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: 100%;
      margin-right: 16px;
    }
    .template2AvatarName {
      margin-bottom: 30px;
    }
    .template2Header__inner--Left {
      padding: 75px 0px 0px 50px;
    }
    .template2Header__inner--Right {
      padding: 40px;
    }
    .template2HeaderContact__item {
      width: 50%;
      margin-bottom: 16px;
    }
    .template2HeaderContact__item div.color--textLightGrey {
      padding-right: 15px;
      word-break: break-all;
    }
    .iconTitleBorderDiv::after {
      height: 1px;
      width: 100%;
      right: 0;
      background-color: var(--color-brand-coral);
      top: 13px;
    }
    .iconTitleBorderDiv__inner {
      padding-right: 10px;
    }
    .workExpAndEducation__item,
    .skillCertLangIntrst__item {
      padding-right: 15px;
      padding-left: 15px;
    }
    .template2InfoDiv {
      position: relative;
      padding: 0px 0px 25px 36px;
    }
    .template2InfoDiv__absoluteShape {
      position: absolute;
      background-color: white;
      border: 1px solid var(--color-brand-coral);
      border-radius: 100%;
      width: 23px;
      height: 23px;
      left: 0;
      z-index: 222;
    }
    .template2InfoDiv__absoluteShape::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 9px;
      height: 9px;
      border-radius: 100%;
      background-color: var(--color-brand-coral);
    }
    /* not used */
    .template2InfoDiv::before {
      background-image: url("./images/custom-bullet.svg");
      width: 25px;
      height: 25px;
      background-size: contain;
      background-repeat: no-repeat;
      left: 0;
      top: 0;
      z-index: 111;
    }
    /* not used */
    .template2InfoDiv::after {
      left: 12px;
      top: 0;
      height: 100%;
      width: 1px;
      background-color: var(--color-brand-coral);
      z-index: 11;
    }
    .template2InfoDiv:last-child {
      padding-bottom: 0;
    }
    .skillCertLangIntrst__item {
      margin-bottom: 30px;
    }
    .template2Header__inner--Right .template2HeaderContact__item {
      margin-bottom: 30px;
    }
    .template2Header__inner--Left p {
      padding-right: 30px;
    }
    /* template 2 */
    
    /* template 3 */
    .resumeTemplate_3Body__header--Left {
      padding: 60px 60px 60px 150px;
    }
    .resumeTemplate_3Body__header--Right {
      padding: 60px 80px;
    }
    .template3NameInfo__info {
      padding-left: 15px;
    }
    .template3NameInfo--Bottom .template3_IconText {
      margin-right: 15px;
      margin-bottom: 10px;
    }
    .template3Avatar {
      width: 170px;
      height: 220px;
      object-fit: cover;
    }
    .template3Body__inner__Right__inner {
      padding-left: 80px;
    }
    .template3Body__inner__Right__inner__item {
      margin-bottom: 45px;
    }
    .template3Body__inner__left__item {
      margin-bottom: 60px;
    }
    .template3Body__inner__left__item:last-child {
      margin-bottom: 0;
    }
    .template3EducationDiv__item {
      margin-bottom: 30px;
    }
    .template3EducationDiv__item .paragraphStyle {
      padding-right: 20px;
    }
    /* template 3 */
    
    /* template 4 */
    .template4AvatarInfo--Right {
      padding: 40px;
    }
    .template4AvatarInfo--Left__InnerRight {
      padding: 40px 20px;
    }
    .teplate4ContactInfoBorder {
      height: 1px;
      background-color: var(--text-color-lightGrey2);
      margin: 10px 0px;
    }
    .template4Avatar {
      width: 368px;
      height: 100%;
      object-fit: cover;
    }
    .workExpItemTemplate4 {
      margin-bottom: 15px;
    }
    .workExpItemTemplate4:last-child {
      margin-bottom: 0;
    }
    .workExpItemTemplate4 p {
      padding-right: 30px;
    }
    .eduExpTemplate4 p {
      padding-right: 0px;
    }
    .template4_skillIntrestSection {
      padding: 40px 10px;
      border-radius: 6px;
      margin: 60px 0px;
    }
    .template4_skillIntrestSection__item {
      padding-left: 15px;
      padding-right: 15px;
    }
    .customSectionTemplate4 {
      margin-top: 60px;
    }
    /* template 4 */
    
    /* responsive style */
    @media screen and (min-width: 992px) {
      .blockSpan-lg {
        display: block;
      }
    }
    @media screen and (max-width: 1599px) {
      .resumeTemplateBody__inner,
      .resumeTemplateBody__innerCopy {
        /* setting document padding */
        padding: 75px 100px;
      }
      .resumeTemplate_3Body__header--Left {
        padding: 60px 60px 60px 100px;
      }
    }
    @media screen and (max-width: 1399px) {
      .resumeTemplateBody__inner,
      .resumeTemplateBody__innerCopy {
        /* setting document padding */
        padding: 75px 75px 50px 75px;
      }
      .resumeDocumentBody__header::before {
        width: 80px;
        height: 80px;
      }
      .resumeDocumentBody__header,
      .userContactInfo {
        padding-left: 50px;
      }
      .resumeTemplate_3Body__header--Left {
        padding: 50px 75px 50px 75px;
      }
      .resumeTemplate_3Body__header--Right {
        padding: 50px 40px;
      }
    }
    @media screen and (max-width: 1200px) {
      .resumeTemplateBody {
        /* technically considering this class as the body tag */
        font-size: 42.5%;
      }
      .resumeTemplateBody__inner,
      .resumeTemplate_3Body__header--Left,
      .resumeTemplate_3Body__header--Right,
      .resumeTemplateBody__innerCopy {
        /* setting document padding */
        padding: 50px 30px;
      }
      .resumeDocumentBody__header::before {
        width: 70px;
        height: 70px;
      }
      .resumeDocumentBody__header__contactInfo {
        width: 100%;
        float: none;
      }
      .template3Body__inner__Right__inner {
        padding: 0px 30px;
      }
      .flexWidth100-lg {
        width: 100%;
      }
      .flexWrap-lg {
        flex-wrap: wrap;
      }
      .template4AvatarInfo--Right {
        padding: 25px 20px;
      }
    }
    @media screen and (max-width: 1100px) {
    }
    @media screen and (max-width: 991px) {
      .resumeColumn100-md {
        width: 100%;
      }
      .wrap-md {
        flex-wrap: wrap;
      }
      .contactInfo__inner {
        justify-content: space-around;
      }
      .contactInfo__inner__item {
        width: auto;
        margin: 10px 15px 10px 0px;
      }
      .userContactInfo {
        padding-left: 0;
      }
      .userAvatarAndIntro {
        margin-top: 20px;
      }
      .resumeTemplateBody .mt80 {
        margin-top: 20px;
      }
      .resumeColumn100-md {
        padding: 0;
      }
      .skillsInnerContainer {
        padding-top: 10px;
      }
      .resumeColumn20-md {
        width: 20%;
      }
      .userAvatarAndIntro img {
        width: 70px;
        height: 70px;
      }
      .userAvatarAndIntro {
        align-items: flex-start;
      }
      .flexWidth100-md {
        width: 100%;
      }
      .flexWrap-md {
        flex-wrap: wrap;
      }
      .displayNone-md {
        display: none;
      }
      .displayBlock-md {
        display: block;
      }
      .workExpAndEducation__item,
      .skillCertLangIntrst__item {
        padding-right: 0px;
        padding-left: 0px;
      }
      .mt30-md {
        margin-top: 30px;
      }
      .mt40-md {
        margin-top: 40px;
      }
      .mb30-md {
        margin-bottom: 30px;
      }
      .mb40-md {
        margin-bottom: 40px;
      }
      .flexWidth50-md {
        width: 50%;
      }
      .template2Header__inner--Left,
      .template2Body {
        padding: 40px;
      }
      .template2Header__inner--Left p {
        padding-right: 0px;
      }
      .template2HeaderContact__item:last-child {
        margin-bottom: 0;
      }
      .resumeTemplate_3Body__header--Left,
      .resumeTemplate_3Body__header--Right {
        padding: 40px 30px;
      }
      .esumeTemplate_3Body__header--Right {
        padding-bottom: 0;
      }
      .template3Body__innerContainer {
        flex-wrap: wrap-reverse;
      }
      .template3Body__inner__Right__inner {
        padding: 0;
      }
      .template4_skillIntrestSection__item {
        padding: 0px;
        margin-bottom: 20px;
      }
      .template4_skillIntrestSection__item .paragraphStyle,
      .template4_skillIntrestSection__item .heading3 {
        padding-left: 15px;
        padding-right: 15px;
      }
      .customSectionTemplate4 {
        margin-top: 30px;
      }
    }
    @media screen and (max-width: 767px) {
      .resumeTemplateBody__inner {
        padding: 30px 20px;
      }
      .resumeTemplateBody__innerCopy {
        padding: 30px 0px;
      }
      .template2Body {
        padding: 0px 20px 40px 20px;
      }
      .resumeDocumentBody__header {
        padding-left: 0px;
      }
      .resumeDocumentBody__header::before {
        width: 30px;
        height: 30px;
        left: -10px;
        top: 0px;
      }
      .userRole {
        flex-direction: column;
        align-items: unset;
      }
      .borderLineDiv {
        width: 100%;
      }
      .borderLineDiv::before {
        display: none;
      }
      .borderLineDiv {
        margin: 10px 0px 0px 0px;
      }
      .contactInfo__inner {
        flex-wrap: wrap;
      }
      .contactInfo__inner__item {
        width: 100%;
      }
      .userAvatarAndIntro {
        margin-top: 30px;
      }
      .userAvatarAndIntro img {
        width: 90px;
        height: 90px;
        margin-bottom: 20px;
      }
      .displayNone-sm {
        display: none;
      }
      .displayBlock-sm {
        display: block;
      }
      .mt0-sm {
        margin-top: 0;
      }
      .resumeRow--1 {
        flex-wrap: wrap-reverse;
      }
      .introSwap {
        flex-direction: column-reverse;
      }
      .userAvatarAndIntro {
        flex-wrap: wrap;
      }
      .resumeColumn100-sm {
        width: 100%;
      }
      .addressDiv {
        margin-top: 30px;
      }
      .resumeDocumentBody__header__inner {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 20px;
      }
      .resumeDocumentBody__header__inner img {
        width: 90px;
        height: 90px;
        object-fit: cover;
        margin-right: 20px;
      }
      .template2Header__inner--Left,
      .template2Header__inner--Right,
      .resumeTemplate_3Body__header--Left,
      .resumeTemplate_3Body__header--Right {
        padding: 40px 20px;
      }
      .flexwrap-sm {
        flex-wrap: wrap;
      }
      .flexWidth100-sm {
        width: 100%;
      }
      .template3EducationDiv__item .paragraphStyle {
        padding-right: 0px;
      }
      .template4Avatar {
        width: 200px;
        height: 200px;
        border: 1px solid var(--color-white);
      }
      .template4AvatarInfo--Left__InnerRight {
        padding-top: 0;
        padding-bottom: 0;
      }
      .template4AvatarInfo--Left {
        padding: 40px 20px;
        align-items: center;
      }
      .educationTemplate4 {
        margin-top: 30px;
      }
      .workExpItemTemplate4 p {
        padding-right: 0px;
      }
      .template4_skillIntrestSection {
        margin: 40px 0px;
      }
    }
    @media screen and (max-width: 650px) {
      .userAvatarAndIntro__intro {
        margin-top: 10px;
        width: 100%;
      }
      .yearsAndCompany,
      .yearsAndCompanySummary {
        width: 100%;
      }
      .resumeColumn70__inneContainer50 {
        width: 100%;
        margin: 10px 0px;
      }
      .template2InfoDiv__ProjectHeader {
        flex-direction: column;
      }
      .templat2projectSection__compNameDate {
        margin-top: 10px;
      }
    }
    @media screen and (max-width: 575px) {
      .paddingZero-xs {
        padding: 0;
      }
      .resumeDocumentBody__header .heading1 {
        font-size: 4em;
      }
      .resumeDocumentBody__header .heading3 {
        font-size: 2.2em;
      }
      .flexWidth100-xs,
      .template2HeaderContact__item,
      .flexWidth25.flexWidth50-md {
        width: 100%;
      }
      .flexWrap-xs,
      .template2HeaderContact {
        flex-wrap: wrap;
      }
      .template2HeaderContact__item div.color--textLightGrey {
        padding-right: 0px;
      }
      .template3Avatar {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-bottom: 10px;
      }
      .template3NameInfo {
        flex-direction: column;
      }
      .template3NameInfo__info {
        padding-left: 0px;
      }
      .template3NameInfo--Bottom {
        flex-direction: column;
        align-items: unset;
      }
      .template3NameInfo {
        margin-bottom: 0 !important;
      }
      .template4AvatarInfo--Left__InnerRight {
        padding: 0;
        margin: 20px 0px 0px 0px;
      }
    }
    @media screen and (max-width: 450px) {
    }
    @media screen and (max-width: 350px) {
    }
    /* responsive style */
    /* end of resume template styles */
    
    
    .watermark{
      width: 100%;
      font-size: 16px;
      text-align: center;
      padding: 15px 0;
      filter:grayscale(1);
      opacity: .5;
    }
    .watermark img{
      height: 30px;
      margin-left: 5px;
    }
    
    </style>
`