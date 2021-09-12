import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';
import useSignUpLogic from './Logic/useSignUpLogic';
import dummyDP from '../../images/dummy_user.svg';
import { FC } from 'react';

const SignUp: FC = (): JSX.Element => {
  const {
    handleSignUp,
    handleInput,
    credentials,
    validationMessageTags: vmt,
    handleCountry,
    displayPic,
    handleDisplayPic,
  } = useSignUpLogic();

  return (
    <Wrapper className='flex'>
      <form>
        <h1 className='heading'>
          Sign Up to sangeetMay to listen your fav songs
        </h1>

        {/* DP */}
        <div className='row display_pic_row flex'>
          <label htmlFor='dp'>
            <img
              src={displayPic.preview ? displayPic.preview : dummyDP}
              alt='DP'
              onLoad={() =>
                displayPic.preview && URL.revokeObjectURL(displayPic.preview)
              }
            />
          </label>

          <div className='right flex'>
            <div className='upload_img_text flex'>
              <FaArrowAltCircleLeft className='directing_to_dp_arrow' />
              <span>Upload Display Pic</span>
              <span className='must'> *</span>
            </div>

            <p ref={vmt.displayPicValidationMessageTag} className='message' />
          </div>

          <input
            type='file'
            id='dp'
            name='displayPic'
            accept='.png, .jpg, .jpeg'
            onChange={handleDisplayPic}
          />
        </div>

        {/* names  Row */}

        <div className='row flex'>
          <FormControl
            inputId='firstName'
            type='text'
            label='First Name'
            name='firstName'
            inputValue={credentials.firstName}
            placeholder='Enter your first name'
            handleInput={handleInput}
            refObj={vmt.firstNameValidationMessageTag}
            formControlStyle={{
              inputColor: 'var(--little-dark-color)',
              fcWidth: '45%',
              labelFs: '1.2em',
              inputFs: '1em',
              inputPadding: '8px 10px',
              messageFs: '1.1em',
              inputW: '100%',
            }}
          />

          <FormControl
            inputId='lastName'
            type='text'
            label='Last Name'
            name='lastName'
            placeholder='Enter your last name'
            inputValue={credentials.lastName}
            handleInput={handleInput}
            refObj={vmt.lastNameValidationMessageTag}
            formControlStyle={{
              fcWidth: '45%',
              labelFs: '1.2em',
              inputFs: '1em',
              inputPadding: '8px 10px',
              messageFs: '1.2em',
              inputW: '100%',
            }}
          />
        </div>

        {/* Email , age Row */}

        <div className='row email_age_row flex'>
          <FormControl
            inputId='email'
            type='text'
            label='Email'
            name='email'
            inputValue={credentials.email}
            placeholder='Enter your email'
            handleInput={handleInput}
            refObj={vmt.emailValidationMessageTag}
            formControlStyle={{
              inputColor: 'var(--little-dark-color)',
              fcWidth: '45%',
              labelFs: '1.2em',
              inputFs: '1em',
              inputPadding: '8px 10px',
              messageFs: '1.1em',
              inputW: '100%',
            }}
          />

          <FormControl
            inputId='age'
            type='number'
            label='Age'
            name='age'
            inputValue={credentials.age}
            handleInput={handleInput}
            refObj={vmt.ageValidationMessageTag}
            numberInputMax={100}
            numberInputMin={12}
            formControlStyle={{
              fcWidth: '45%',
              labelFs: '1.2em',
              inputFs: '1em',
              inputPadding: '8px 10px',
              messageFs: '1.2em',
              inputW: '100%',
            }}
          />
        </div>

        {/* Role , Country Row */}
        <div className='row gender_country_row flex'>
          {/* Gender */}
          <div className='gender_div'>
            <div className='top'>
              <label htmlFor='gender'>Gender</label>
              <span className='must'> *</span>
            </div>

            <div className='bottom flex'>
              <div className='male flex'>
                <label htmlFor='male'>Male</label>
                <input
                  type='radio'
                  id='male'
                  name='gender'
                  value='male'
                  onChange={handleInput}
                />
              </div>

              <div className='female flex'>
                <label htmlFor='female'>female</label>
                <input
                  type='radio'
                  id='female'
                  name='gender'
                  value='female'
                  onChange={handleInput}
                />
              </div>
            </div>

            <p ref={vmt.genderValidationMessageTag} className='message' />
          </div>

          {/* Country */}
          <div className='country_div'>
            <div className='top'>
              <label htmlFor='country'>Country</label>
              <span className='must'> *</span>
            </div>

            <select
              id='country'
              onChange={handleCountry}
              defaultValue='Select Country'
            >
              <option disabled>Select Country</option>
              <option value='Afganistan'>Afghanistan</option>
              <option value='Albania'>Albania</option>
              <option value='Algeria'>Algeria</option>
              <option value='American Samoa'>American Samoa</option>
              <option value='Andorra'>Andorra</option>
              <option value='Angola'>Angola</option>
              <option value='Anguilla'>Anguilla</option>
              <option value='Antigua & Barbuda'>Antigua & Barbuda</option>
              <option value='Argentina'>Argentina</option>
              <option value='Armenia'>Armenia</option>
              <option value='Aruba'>Aruba</option>
              <option value='Australia'>Australia</option>
              <option value='Austria'>Austria</option>
              <option value='Azerbaijan'>Azerbaijan</option>
              <option value='Bahamas'>Bahamas</option>
              <option value='Bahrain'>Bahrain</option>
              <option value='Bangladesh'>Bangladesh</option>
              <option value='Barbados'>Barbados</option>
              <option value='Belarus'>Belarus</option>
              <option value='Belgium'>Belgium</option>
              <option value='Belize'>Belize</option>
              <option value='Benin'>Benin</option>
              <option value='Bermuda'>Bermuda</option>
              <option value='Bhutan'>Bhutan</option>
              <option value='Bolivia'>Bolivia</option>
              <option value='Bonaire'>Bonaire</option>
              <option value='Bosnia & Herzegovina'>Bosnia & Herzegovina</option>
              <option value='Botswana'>Botswana</option>
              <option value='Brazil'>Brazil</option>
              <option value='British Indian Ocean Ter'>
                British Indian Ocean Ter
              </option>
              <option value='Brunei'>Brunei</option>
              <option value='Bulgaria'>Bulgaria</option>
              <option value='Burkina Faso'>Burkina Faso</option>
              <option value='Burundi'>Burundi</option>
              <option value='Cambodia'>Cambodia</option>
              <option value='Cameroon'>Cameroon</option>
              <option value='Canada'>Canada</option>
              <option value='Canary Islands'>Canary Islands</option>
              <option value='Cape Verde'>Cape Verde</option>
              <option value='Cayman Islands'>Cayman Islands</option>
              <option value='Central African Republic'>
                Central African Republic
              </option>
              <option value='Chad'>Chad</option>
              <option value='Channel Islands'>Channel Islands</option>
              <option value='Chile'>Chile</option>
              <option value='China'>China</option>
              <option value='Christmas Island'>Christmas Island</option>
              <option value='Cocos Island'>Cocos Island</option>
              <option value='Colombia'>Colombia</option>
              <option value='Comoros'>Comoros</option>
              <option value='Congo'>Congo</option>
              <option value='Cook Islands'>Cook Islands</option>
              <option value='Costa Rica'>Costa Rica</option>
              <option value='Cote DIvoire'>Cote DIvoire</option>
              <option value='Croatia'>Croatia</option>
              <option value='Cuba'>Cuba</option>
              <option value='Curaco'>Curacao</option>
              <option value='Cyprus'>Cyprus</option>
              <option value='Czech Republic'>Czech Republic</option>
              <option value='Denmark'>Denmark</option>
              <option value='Djibouti'>Djibouti</option>
              <option value='Dominica'>Dominica</option>
              <option value='Dominican Republic'>Dominican Republic</option>
              <option value='East Timor'>East Timor</option>
              <option value='Ecuador'>Ecuador</option>
              <option value='Egypt'>Egypt</option>
              <option value='El Salvador'>El Salvador</option>
              <option value='Equatorial Guinea'>Equatorial Guinea</option>
              <option value='Eritrea'>Eritrea</option>
              <option value='Estonia'>Estonia</option>
              <option value='Ethiopia'>Ethiopia</option>
              <option value='Falkland Islands'>Falkland Islands</option>
              <option value='Faroe Islands'>Faroe Islands</option>
              <option value='Fiji'>Fiji</option>
              <option value='Finland'>Finland</option>
              <option value='France'>France</option>
              <option value='French Guiana'>French Guiana</option>
              <option value='French Polynesia'>French Polynesia</option>
              <option value='French Southern Ter'>French Southern Ter</option>
              <option value='Gabon'>Gabon</option>
              <option value='Gambia'>Gambia</option>
              <option value='Georgia'>Georgia</option>
              <option value='Germany'>Germany</option>
              <option value='Ghana'>Ghana</option>
              <option value='Gibraltar'>Gibraltar</option>
              <option value='Great Britain'>Great Britain</option>
              <option value='Greece'>Greece</option>
              <option value='Greenland'>Greenland</option>
              <option value='Grenada'>Grenada</option>
              <option value='Guadeloupe'>Guadeloupe</option>
              <option value='Guam'>Guam</option>
              <option value='Guatemala'>Guatemala</option>
              <option value='Guinea'>Guinea</option>
              <option value='Guyana'>Guyana</option>
              <option value='Haiti'>Haiti</option>
              <option value='Hawaii'>Hawaii</option>
              <option value='Honduras'>Honduras</option>
              <option value='Hong Kong'>Hong Kong</option>
              <option value='Hungary'>Hungary</option>
              <option value='Iceland'>Iceland</option>
              <option value='Indonesia'>Indonesia</option>
              <option value='India'>India</option>
              <option value='Iran'>Iran</option>
              <option value='Iraq'>Iraq</option>
              <option value='Ireland'>Ireland</option>
              <option value='Isle of Man'>Isle of Man</option>
              <option value='Israel'>Israel</option>
              <option value='Italy'>Italy</option>
              <option value='Jamaica'>Jamaica</option>
              <option value='Japan'>Japan</option>
              <option value='Jordan'>Jordan</option>
              <option value='Kazakhstan'>Kazakhstan</option>
              <option value='Kenya'>Kenya</option>
              <option value='Kiribati'>Kiribati</option>
              <option value='Korea North'>Korea North</option>
              <option value='Korea Sout'>Korea South</option>
              <option value='Kuwait'>Kuwait</option>
              <option value='Kyrgyzstan'>Kyrgyzstan</option>
              <option value='Laos'>Laos</option>
              <option value='Latvia'>Latvia</option>
              <option value='Lebanon'>Lebanon</option>
              <option value='Lesotho'>Lesotho</option>
              <option value='Liberia'>Liberia</option>
              <option value='Libya'>Libya</option>
              <option value='Liechtenstein'>Liechtenstein</option>
              <option value='Lithuania'>Lithuania</option>
              <option value='Luxembourg'>Luxembourg</option>
              <option value='Macau'>Macau</option>
              <option value='Macedonia'>Macedonia</option>
              <option value='Madagascar'>Madagascar</option>
              <option value='Malaysia'>Malaysia</option>
              <option value='Malawi'>Malawi</option>
              <option value='Maldives'>Maldives</option>
              <option value='Mali'>Mali</option>
              <option value='Malta'>Malta</option>
              <option value='Marshall Islands'>Marshall Islands</option>
              <option value='Martinique'>Martinique</option>
              <option value='Mauritania'>Mauritania</option>
              <option value='Mauritius'>Mauritius</option>
              <option value='Mayotte'>Mayotte</option>
              <option value='Mexico'>Mexico</option>
              <option value='Midway Islands'>Midway Islands</option>
              <option value='Moldova'>Moldova</option>
              <option value='Monaco'>Monaco</option>
              <option value='Mongolia'>Mongolia</option>
              <option value='Montserrat'>Montserrat</option>
              <option value='Morocco'>Morocco</option>
              <option value='Mozambique'>Mozambique</option>
              <option value='Myanmar'>Myanmar</option>
              <option value='Nambia'>Nambia</option>
              <option value='Nauru'>Nauru</option>
              <option value='Nepal'>Nepal</option>
              <option value='Netherland Antilles'>Netherland Antilles</option>
              <option value='Netherlands'>Netherlands (Holland, Europe)</option>
              <option value='Nevis'>Nevis</option>
              <option value='New Caledonia'>New Caledonia</option>
              <option value='New Zealand'>New Zealand</option>
              <option value='Nicaragua'>Nicaragua</option>
              <option value='Niger'>Niger</option>
              <option value='Nigeria'>Nigeria</option>
              <option value='Niue'>Niue</option>
              <option value='Norfolk Island'>Norfolk Island</option>
              <option value='Norway'>Norway</option>
              <option value='Oman'>Oman</option>
              <option value='Pakistan'>Pakistan</option>
              <option value='Palau Island'>Palau Island</option>
              <option value='Palestine'>Palestine</option>
              <option value='Panama'>Panama</option>
              <option value='Papua New Guinea'>Papua New Guinea</option>
              <option value='Paraguay'>Paraguay</option>
              <option value='Peru'>Peru</option>
              <option value='Phillipines'>Philippines</option>
              <option value='Pitcairn Island'>Pitcairn Island</option>
              <option value='Poland'>Poland</option>
              <option value='Portugal'>Portugal</option>
              <option value='Puerto Rico'>Puerto Rico</option>
              <option value='Qatar'>Qatar</option>
              <option value='Republic of Montenegro'>
                Republic of Montenegro
              </option>
              <option value='Republic of Serbia'>Republic of Serbia</option>
              <option value='Reunion'>Reunion</option>
              <option value='Romania'>Romania</option>
              <option value='Russia'>Russia</option>
              <option value='Rwanda'>Rwanda</option>
              <option value='St Barthelemy'>St Barthelemy</option>
              <option value='St Eustatius'>St Eustatius</option>
              <option value='St Helena'>St Helena</option>
              <option value='St Kitts-Nevis'>St Kitts-Nevis</option>
              <option value='St Lucia'>St Lucia</option>
              <option value='St Maarten'>St Maarten</option>
              <option value='St Pierre & Miquelon'>St Pierre & Miquelon</option>
              <option value='St Vincent & Grenadines'>
                St Vincent & Grenadines
              </option>
              <option value='Saipan'>Saipan</option>
              <option value='Samoa'>Samoa</option>
              <option value='Samoa American'>Samoa American</option>
              <option value='San Marino'>San Marino</option>
              <option value='Sao Tome & Principe'>Sao Tome & Principe</option>
              <option value='Saudi Arabia'>Saudi Arabia</option>
              <option value='Senegal'>Senegal</option>
              <option value='Seychelles'>Seychelles</option>
              <option value='Sierra Leone'>Sierra Leone</option>
              <option value='Singapore'>Singapore</option>
              <option value='Slovakia'>Slovakia</option>
              <option value='Slovenia'>Slovenia</option>
              <option value='Solomon Islands'>Solomon Islands</option>
              <option value='Somalia'>Somalia</option>
              <option value='South Africa'>South Africa</option>
              <option value='Spain'>Spain</option>
              <option value='Sri Lanka'>Sri Lanka</option>
              <option value='Sudan'>Sudan</option>
              <option value='Suriname'>Suriname</option>
              <option value='Swaziland'>Swaziland</option>
              <option value='Sweden'>Sweden</option>
              <option value='Switzerland'>Switzerland</option>
              <option value='Syria'>Syria</option>
              <option value='Tahiti'>Tahiti</option>
              <option value='Taiwan'>Taiwan</option>
              <option value='Tajikistan'>Tajikistan</option>
              <option value='Tanzania'>Tanzania</option>
              <option value='Thailand'>Thailand</option>
              <option value='Togo'>Togo</option>
              <option value='Tokelau'>Tokelau</option>
              <option value='Tonga'>Tonga</option>
              <option value='Trinidad & Tobago'>Trinidad & Tobago</option>
              <option value='Tunisia'>Tunisia</option>
              <option value='Turkey'>Turkey</option>
              <option value='Turkmenistan'>Turkmenistan</option>
              <option value='Turks & Caicos Is'>Turks & Caicos Is</option>
              <option value='Tuvalu'>Tuvalu</option>
              <option value='Uganda'>Uganda</option>
              <option value='United Kingdom'>United Kingdom</option>
              <option value='Ukraine'>Ukraine</option>
              <option value='United Arab Erimates'>United Arab Emirates</option>
              <option value='United States of America'>
                United States of America
              </option>
              <option value='Uraguay'>Uruguay</option>
              <option value='Uzbekistan'>Uzbekistan</option>
              <option value='Vanuatu'>Vanuatu</option>
              <option value='Vatican City State'>Vatican City State</option>
              <option value='Venezuela'>Venezuela</option>
              <option value='Vietnam'>Vietnam</option>
              <option value='Virgin Islands (Brit)'>
                Virgin Islands (Brit)
              </option>
              <option value='Virgin Islands (USA)'>Virgin Islands (USA)</option>
              <option value='Wake Island'>Wake Island</option>
              <option value='Wallis & Futana Is'>Wallis & Futana Is</option>
              <option value='Yemen'>Yemen</option>
              <option value='Zaire'>Zaire</option>
              <option value='Zambia'>Zambia</option>
              <option value='Zimbabwe'>Zimbabwe</option>
            </select>

            <p ref={vmt.countryValidationMessageTag} className='message' />
          </div>
        </div>

        {/* Password Row */}
        <div className='row flex'>
          <FormControl
            inputId='password'
            type='password'
            label='Password'
            name='password'
            inputValue={credentials.password}
            placeholder='Enter your password'
            handleInput={handleInput}
            refObj={vmt.passwordValidationMessageTag}
            formControlStyle={{
              inputColor: 'var(--little-dark-color)',
              fcWidth: '45%',
              labelFs: '1.2em',
              inputFs: '1em',
              inputPadding: '8px 10px',
              messageFs: '1.1em',
              inputW: '100%',
            }}
          />

          <FormControl
            inputId='confirmPassword'
            type='password'
            label='Confirm Password'
            name='confirmPassword'
            placeholder='Confirm your password'
            inputValue={credentials.confirmPassword}
            handleInput={handleInput}
            refObj={vmt.confirmPasswordValidationMessageTag}
            formControlStyle={{
              fcWidth: '45%',
              labelFs: '1.2em',
              inputFs: '1em',
              inputPadding: '8px 10px',
              messageFs: '1.2em',
              inputW: '100%',
            }}
          />
        </div>

        <Button
          type='button'
          handleClick={handleSignUp}
          buttonStyle={{
            padding: '8px 20px',
            fontSize: '1.2em',
            hoverTransform: 'scale(1.05) translateY(-2px)',
            transition: 'transform 0.4s ease',
            mt: '20px',
            width: '100%',
            bgColor: 'var(--secondary-color)',
            color: 'var(--dark-color)',
          }}
        >
          Sign up
        </Button>

        <Link to='/sign-in' className='sign_in_link'>
          <Button
            type='button'
            buttonStyle={{
              padding: '8px 20px',
              fontSize: '1.1em',
              hoverTransform: 'translateY(-3px)',
              transition: 'transform 0.4s ease',
              width: '100%',
              bgColor: 'var(--tertiary-color)',
              color: 'var(--dark-color)',
            }}
          >
            Already have an account? Sign In Now
          </Button>
        </Link>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px 10px;
  flex-direction: column;
  border: 1px dashed #8888;
  width: 100%;

  .heading {
    font-size: 1.3em;
    text-transform: capitalize;
    letter-spacing: 2px;
    padding: 8px 0 8px;
    font-weight: 300;
    text-align: center;
    line-height: 1.4;
    color: var(--primary-color);
  }

  form {
    width: 70%;

    .row {
      justify-content: space-between;
      padding: 8px 0 18px;
    }

    .display_pic_row {
      justify-content: center;
      padding: 0px 0 0px;

      label {
        width: 200px;
        height: 170px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .right {
        flex-direction: column;
        align-items: flex-start;
        padding: 0 20px;

        .upload_img_text {
          font-size: 1.2em;
          color: var(--primary-color);

          span {
            margin-left: 10px;
          }
        }
      }

      input {
        display: none;
      }
    }

    .gender_country_row {
      .top {
        padding: 8px 0;

        label {
          font-size: 1.2em;
          color: #dfc6c6;
        }
      }

      .gender_div {
        width: 45%;

        .bottom {
          padding: 5px 0 0;
          justify-content: flex-start;
          color: var(--primary-color);

          .male,
          .female {
            margin-right: 20px;

            label {
              font-size: 1.1em;
              margin-right: 10px;
            }
          }
        }
      }

      .country_div {
        width: 45%;

        #country {
          width: 100%;
          border-radius: 2px;
          font-size: 1em;
          padding: 8px 5px;
        }
      }
    }
  }

  .sign_in_link {
    width: 100%;
    margin-top: 20px;
  }

  @media only screen and (max-width: 750px) {
    padding: 10px;

    form {
      width: 100%;
    }
  }

  @media only screen and (max-width: 570px) {
    /* padding: 10px; */

    form {
      .row {
        padding: 5px 0 5px;
        flex-direction: column;

        .form-control {
          width: 100%;
        }

        .gender_div,
        .country_div {
          width: 100%;
        }
      }

      .email_age_row {
        padding: 5px 0 0px;
      }

      .gender_country_row {
        padding: 5px 0 15px;

        .gender_div {
          padding: 0px 0 15px;
        }

        /* .country_div {
          
        } */
      }

      .directing_to_dp_arrow {
        transform: rotate(90deg);
      }
    }
  }
`;

export default SignUp;
