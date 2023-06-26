import React from 'react';
import {useSelector} from 'react-redux';
import {template2IconBook} from './images/template-2-icon-book';
import {template2IconBriefcase} from './images/template-2-icon-briefcase';
import {template2IconCertifications} from './images/template-2-icon-certifications';
import {template2IconCustomSection} from './images/template-2-icon-custom-section';
import {template2IconLanguages} from './images/template-2-icon-languages';
import {template2IconTop10} from './images/template-2-icon-top10';
import {template3IconEmail} from './images/template-3-icon-email';
import {template3IconLinkedin} from './images/template-3-icon-linkedin';
import {template3IconMap} from './images/template-3-icon-map';
import {template3IconPhone} from './images/template-3-icon-phone';
import {template3IconWebsite} from './images/template-3-icon-website';
import {userImage} from './images/userimage';
import {resumeStyle} from './resumeStyle';
import TemplateItem from './TemplateItem';

const Template3 = props => {
  const viewFlags = useSelector(state => state.profile.viewFlags);

  const {
    hasPersonalInfo,
    hasStoryInfo,
    hasSocialMedia,
    hasSkillsData,
    hasEducation,
    hasWorkExperience,
    hasCertificates,
    hasAwardsAndHonors,
    hasLanguages,
    hasLicenses,
    hasCustomSections,
  } = viewFlags;

  console.log('[Template3.js] Flags : ', viewFlags);

  const personalInfo = useSelector(state => state.profile.profilePersonalInfo);
  const profileSocialMedia = useSelector(
    state => state.profile.profileSocialMedia,
  );
  const profileStory = useSelector(state => state.profile.profileStory);
  const education = useSelector(state => state.profile.profileEducation);
  const skills = useSelector(state => state.profile.profileSkills);
  const certificates = useSelector(state => state.profile.profileCertificates);
  const languages = useSelector(state => state.profile.profileLanguages);
  const licenses = useSelector(state => state.profile.profileLicenses);
  const customSections = useSelector(
    state => state.profile.profileCustomSections,
  );
  const experiences = useSelector(state => state.profile.profileExperiences);
  const profileAwardsAndHonorsList = useSelector(
    state => state.profile.profileAwardsAndHonorsList,
  );

  const profileImage = personalInfo.imageURL;
  const userName =
    personalInfo.firstName !== ''
      ? `${personalInfo.firstName} ${personalInfo.lastName}`
      : '';
  const jobTitle =
    personalInfo.designation !== '' ? personalInfo.designation : '';
  const myStory = profileStory !== '' ? profileStory : '';

  const address = personalInfo.address;
  const addressView =
    address !== null
      ? `
            <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle mb10">
                <img src=${template3IconMap} class="marginRight10p" alt="address">
                <span class="color--textLightGrey2">
                    ${
                      personalInfo.addressLine1 !== undefined
                        ? personalInfo.addressLine1 + ','
                        : ''
                    } ${address.addressLine2}<br>
                    ${address.city}, ${address.state}, ${address.country}, ${
          address.postalCode
        }
                </span>
            </div>
        `
      : '';

  const phoneNumberView =
    personalInfo.primaryPhone !== ''
      ? `
            <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle mb10">
                <img src=${template3IconPhone} class="marginRight10p" alt="phone">
                <span class="color--textLightGrey2">
                    ${personalInfo.primaryCountryCode.dial_code} ${personalInfo.primaryPhone}
                </span>
            </div>  
        `
      : '';

  const emailView =
    personalInfo.email !== ''
      ? `
            <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle mb10">
                <img src=${template3IconEmail} class="marginRight10p" alt="email">
                <span class="color--textLightGrey2">
                    ${personalInfo.email}
                </span>
            </div>
        `
      : '';

  const websiteView =
    profileSocialMedia !== null && profileSocialMedia.website !== ''
      ? `

        <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle">
            <img src=${template3IconWebsite} class="marginRight10p" alt="website">
            <span class="color--textLightGrey2">
                ${profileSocialMedia.website}
            </span>
        </div>
    `
      : '';

  const linkedInView =
    profileSocialMedia !== null && profileSocialMedia.linkedIn !== ''
      ? `
        <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle">
            <img src=${template3IconLinkedin} class="marginRight10p" alt="linkedin">
            <span class="color--textLightGrey2">
                ${profileSocialMedia.linkedIn}
            </span>
        </div>
        `
      : '';

  // const instagramView = personalInfo.email !== '' ? `
  //     <div class="contactInfo__inner__item displayFlex alignItemsCenter justifyContentCente">
  //         <div class="circularIcon bg--brandBlue borderRadius100">
  //             <img src=${mail} alt="email">
  //         </div>
  //         <div class="titleAndText paragraphStyle">
  //             <span class="color--brandBlue displayBlock">Email</span>
  //             <span class="color--textLightGrey displayBlock">${personalInfo.email}</span>
  //         </div>
  //     </div>
  // ` : ''

  //Set Resume Experience
  let experienceString = '';
  experiences.forEach(it => {
    experienceString =
      experienceString +
      `
                <div class="displayFlex userAvatarAndIntro innerRow">
                    <div class="yearsAndCompany">
                        <div class="year paragraphStyle color--brandBlue font--bold">${
                          it.startDate
                        } - ${it.isSelect ? 'Present' : it.endDate}</div>
                        <p class="color--textLightGrey paragraphStyle">
                            ${it.employerName}
                        </p>
                    </div>
                    <div class="userAvatarAndIntro__intro yearsAndCompanySummary">
                        <p class="paragraphStyle color--textLightGrey">
                            ${it.jobTitle}<br>
                            ${it.description}
                        </p>
                    </div>
                </div>       
            `;
  });
  const experienceView =
    experiences.length > 0
      ? `
            <div class="template3Body__inner__left__item">
                <div class="iconTitleBorderDiv afterClass position--relative mb20">
                    <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                        <img src=${template2IconBriefcase} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                        <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Work Experience</h2>
                    </div>
                </div>
                ${experienceString}                    
            </div>
    `
      : '';

  //set up education
  let educationString = '';
  education.forEach(it => {
    educationString =
      educationString +
      `
            <div class="template3EducationDiv__item flexWidth50 flexWidth100-sm">
                <div class="year paragraphStyle color--brandBlue font--bold"></div>
                <div class="paragraphStyle color--coral font--bold">${it.educationProgram} - ${it.graduatedYear}</div>
                <div class="paragraphStyle color--brandBlue">${it.educationType} | ${it.school}</div>
                
            </div>
        `;
  });
  const educationView =
    education.length > 0
      ? `
        <div class="template3Body__inner__left__item">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                    <img src=${template2IconBook} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Education</h2>
                </div>
            </div>
            <div class="template3EducationDiv displayFlex flexWrap">
                ${educationString}
            </div>
        </div>
    `
      : '';

  // set up skills
  const primarySkills = skills !== null ? skills.primarySkills : [];
  let resumeSkillsString = '';
  primarySkills.forEach(it => {
    resumeSkillsString = resumeSkillsString + `<li>${it}</li>`;
  });
  const skillsView =
    primarySkills.length > 0
      ? `
        <div class="template3Body__inner__Right__inner__item">
            <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                <img src=${template2IconTop10} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Top 10 Skills</h2>
            </div>
            <!-- info -->
            <ul class="customUnOrderdList customUnOrderdList--coral">
                ${resumeSkillsString}
            </ul>
            <!-- info -->
        </div>
        `
      : '';

  //set resume certificate view
  let certificateString = '';
  certificates.forEach(it => {
    certificateString =
      certificateString +
      `
                <li>${it.certificationName},  ${it.certificate}</li>
        `;
  });
  const certificateView =
    certificates.length > 0
      ? `
            <div class="template3Body__inner__Right__inner__item">
                <div class="iconTitleBorderDiv afterClass position--relative mb20">
                    <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                        <img src=${template2IconCertifications} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                        <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Certifications</h2>
                    </div>
                </div>
                <!-- info -->
                <ul class="customUnOrderdList customUnOrderdList--coral">
                    ${certificateString}
                </ul>
                <!-- info -->
            </div>
    `
      : '';

  //set up license
  let licenseString = '';
  licenses.forEach(it => {
    licenseString =
      licenseString + `<li>${it.licenseName}, #${it.license}</li>`;
  });

  const licenseView =
    licenses.length > 0
      ? `

        <div class="template3Body__inner__Right__inner__item">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                    <img src=${template2IconCertifications} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Licenses</h2>
                </div>
            </div>
            <!-- info -->
            <ul class="customUnOrderdList customUnOrderdList--coral">
                ${licenseString}
            </ul>
            <!-- info -->
        </div>
    `
      : '';

  //set up languages
  let languageString = '';
  languages.forEach(it => {
    languageString = languageString + `<li>${it.languagename}</li>`;
  });

  const languagesView =
    languages.length > 0
      ? `

        <div class="template3Body__inner__Right__inner__item">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                    <img src=${template2IconLanguages} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Languages</h2>
                </div>
            </div>
            <!-- info -->
            <ul class="customUnOrderdList customUnOrderdList--coral">
                ${languageString}
             </ul>
            <!-- info -->
        </div>
    `
      : '';

  //set resume certificate view
  let awardString = '';
  profileAwardsAndHonorsList.forEach(it => {
    awardString =
      awardString +
      `
                 <li>${it.awardname} by ${it.IssuedBy}</li>
         `;
  });
  const awardsView =
    profileAwardsAndHonorsList.length > 0
      ? `
             <div class="template3Body__inner__Right__inner__item">
                 <div class="iconTitleBorderDiv afterClass position--relative mb20">
                     <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                         <img src=${template2IconCertifications} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                         <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Awards And Honors</h2>
                     </div>
                 </div>
                 <!-- info -->
                 <ul class="customUnOrderdList customUnOrderdList--coral">
                     ${awardString}
                 </ul>
                 <!-- info -->
             </div>
     `
      : '';

  // //set up interests
  // let interestString = ''
  // interests.forEach(it => {
  //     interestString = interestString + `<li>${it.interest}</li>`
  // })

  // const interestView = interests.length > 0 ? `
  //     <div class="template3Body__inner__Right__inner__item">
  //         <div class="iconTitleBorderDiv afterClass position--relative mb20">
  //             <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
  //                 <img src=${template2IconIntrests} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
  //                 <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Interests</h2>
  //             </div>
  //         </div>
  //         <!-- info -->
  //         <ul class="customUnOrderdList customUnOrderdList--coral">
  //             ${interestString}
  //          </ul>
  //         <!-- info -->
  //     </div>` : ''

  // let projectsString = ''
  // projects.forEach((it,index) => {
  //     projectsString = projectsString + `
  //         <div class="displayFlex userAvatarAndIntro innerRow">
  //             <div class="yearsAndCompany">
  //                 <div class="year paragraphStyle color--brandBlue font--bold">${it.start_date} - ${it.end_date}</div>
  //                 <p class="color--textLightGrey paragraphStyle">
  //                     ${it.company_name}
  //                 </p>
  //             </div>
  //             <div class="userAvatarAndIntro__intro yearsAndCompanySummary">
  //                 <div class="paragraphStyle color--coral font--bold">
  //                     ${it.project_name}
  //                 </div>
  //                 <div class="paragraphStyle color--brandBlue">
  //                     ${it.your_role}
  //                 </div>
  //                 <p class="paragraphStyle color--textLightGrey">
  //                     ${it.description}
  //                 </p>
  //             </div>
  //         </div>
  //     `
  // })
  // const projectView = projects.length > 0 ? `
  //     <div class="template3Body__inner__left__item">
  //         <div class="iconTitleBorderDiv afterClass position--relative mb20">
  //             <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
  //                 <img src=${template2IconProjects} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
  //                 <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Projects</h2>
  //             </div>
  //         </div>
  //         ${projectsString}
  //     </div>
  // ` : ''

  //  //set references

  //  let referencesString = ''
  //  references.forEach(it => {
  //      if(it.should_available_on_request){
  //          referencesString = referencesString + `
  //             <div class="template3EducationDiv__item flexWidth50 flexWidth100-sm">
  //                 <div class="year paragraphStyle color--brandBlue font--bold"></div>
  //                 <div class="paragraphStyle color--coral font--bold">${it.contact_person}</div>
  //                 <div class="paragraphStyle color--brandBlue">${it.relation}</div>
  //                 <p class="paragraphStyle color--textLightGrey">
  //                 ${it.phone_number} - ${it.email}
  //                 </p>
  //             </div>
  //          `
  //      }
  //  })

  //  const referencesView = references.length > 0 ? `
  //     <div class="template3Body__inner__left__item">
  //         <div class="iconTitleBorderDiv afterClass position--relative mb20">
  //             <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
  //                 <img src=${template2IconProjects} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
  //                 <h2 class="displayInlineBlock verticalMiddle paragraphStyle">References</h2>
  //             </div>
  //         </div>
  //         <div class="template3EducationDiv displayFlex flexWrap">
  //         ${referencesString}
  //         </div>
  //     </div>
  //  ` : ''

  //  const activityView = activity !== null ? `
  //     <div class="template3Body__inner__left__item">
  //         <div class="iconTitleBorderDiv afterClass position--relative mb20">
  //             <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
  //                 <img src=${template2IconCustomSection} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
  //                 <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Activity</h2>
  //             </div>
  //         </div>
  //         <p class="mt10 color--textLightGrey paragraphStyle">
  //                 ${activity}
  //         </p>
  //     </div>
  //     ` : '';

  //set up custom sections
  let customSectionString = '';
  customSections.forEach(it => {
    customSectionString =
      customSectionString +
      `
            <div class="projectExptemplate3 innerRow">
                <div class="userAvatarAndIntro__intro">
                    <div class="paragraphStyle color--coral font--bold mb10">
                        ${it.title}
                    </div>
                    <p class="paragraphStyle color--textLightGrey">
                        ${it.subHeading}
                        ${it.sampledesc}
                    </p>
                </div>
            </div>
        `;
  });

  const customSectionsView =
    customSections.length > 0
      ? `

        <div class="template3Body__inner__left__item">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                    <img src=${template2IconCustomSection} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Custom Section Title</h2>
                </div>
            </div>
            ${customSectionString}
        </div>
    `
      : '';

  const htmlCode = `
    <!DOCTYPE html>
    <html lang="en">
      ${resumeStyle}
      <body class="resumeTemplateBody">
        <main>
            <!-- header -->
            <div class="resumeTemplate_3Body__header centerContainer-xxxl displayFlex flexWrap-md">
                <div class="resumeTemplate_3Body__header--Left bg--brandBlue flexWidth60 flexWidth100-md">
                    <div class="template3NameInfo displayFlex mb20">
                    
                        <div class="template3NameInfo__info">
                            <h1 class="heading2 font--bold color--coral">${userName}</h1>
                            <h2 class="font--regular color--white heading3 mb20">${jobTitle}</h2>
                            ${phoneNumberView}
                            ${emailView}
                            ${addressView}
                        </div>
                    </div>
                    ${
                      hasSocialMedia
                        ? `<div class="template3NameInfo--Bottom displayFlex alignItemsCenter flexWrap">
                            ${websiteView}
                            ${linkedInView}
                        </div>`
                        : ''
                    }
                </div>
                ${
                  hasStoryInfo
                    ? `<div class="resumeTemplate_3Body__header--Right flexWidth40 flexWidth100-md">
                        <p class="paragraphStyle color--textLightGrey">
                            <span class="color--coral displayBlock mb10">Introduction</span>
                            ${myStory}
                        </p>
                    </div>`
                    : ''
                }
            </div>
            <!-- header -->
          <div class="resumeTemplateBody__inner resumeDocumentBody centerContainer-xxxl">
    
            <div class="template3Body__innerContainer displayFlex flexWrap-md">
                <div class="template3Body__inner__left flexWidth59 flexWidth100-md">
                    <!-- work experience wrapper -->
                    ${hasWorkExperience ? experienceView : ''}
                    <!-- work experience wrapper -->
                    <!-- Education wrapper -->
                    ${hasEducation ? educationView : ''}
                    <!-- Education wrapper -->
                    
                    ${hasCustomSections ? customSectionsView : ''}
                    <!-- custom section wrapper -->
                </div>
                <div class="template3Body__inner__Right flexWidth41 flexWidth100-md">
                    <div class="template3Body__inner__Right__inner">
                        <div class="iconTitleBorderDiv afterClass position--relative mb20">
                            ${hasSkillsData ? skillsView : ''}
                            ${hasCertificates ? certificateView : ''}
                            ${hasLicenses ? licenseView : ''}
                            ${hasLanguages ? languagesView : ''}
                            ${hasAwardsAndHonors ? awardsView : ''}
                        </div>
                    </div>
                </div> 
            </div>
            <div class="thankyouDiv textAlignCenter">
                <h2 class="color--brandBlue heading2">Thank You</h2>
                <div class="bottomBorderStyle bg--coral marginHorizontalAuto"></div>
            </div>

          </div>
        </main>
        <div class="watermark">
            Powered By <img src="https://1l3fr3479ozgfkufl3txrpq1-wpengine.netdna-ssl.com/wp-content/uploads/2020/11/high5-std.svg">
        </div>
      </body>
    </html>
    
    `;

  return (
    <TemplateItem
      html={htmlCode}
      name="Template 3"
      type={'Free'}
      onSelect={() => props.onSelectPress(htmlCode)}
      onPreview={() => props.onPreviewPress(htmlCode)}
      {...props}
    />
  );
};

export default Template3;
