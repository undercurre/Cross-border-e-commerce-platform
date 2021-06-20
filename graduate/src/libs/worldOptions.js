const options = [
  { label: 'Afghanistan', value: 'Afghanistan' },
  { label: 'Angola', value: 'Angola' },
  { label: 'Albania', value: 'Albania' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'Argentina', value: 'Argentina' },
  { label: 'Armenia', value: 'Armenia' },
  { label: 'French Southern and Antarctic Lands', value: 'French Southern and Antarctic Lands' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Austria', value: 'Austria' },
  { label: 'Azerbaijan', value: 'Azerbaijan' },
  { label: 'Burundi', value: 'Burundi' },
  { label: 'Belgium', value: 'Belgium' },
  { label: 'Benin', value: 'Benin' },
  { label: 'Burkina Faso', value: 'Burkina Faso' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Bulgaria', value: 'Bulgaria' },
  { label: 'The Bahamas', value: 'The Bahamas' },
  { label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' },
  { label: 'Belarus', value: 'Belarus' },
  { label: 'Belize', value: 'Belize' },
  { label: 'Bermuda', value: 'Bermuda' },
  { label: 'Bolivia', value: 'Bolivia' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Brunei', value: 'Brunei' },
  { label: 'Bhutan', value: 'Bhutan' },
  { label: 'Botswana', value: 'Botswana' },
  { label: 'Central African Republic', value: 'Central African Republic' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Switzerland', value: 'Switzerland' },
  { label: 'Chile', value: 'Chile' },
  { label: 'China', value: 'China' },
  { label: 'Ivory Coast', value: 'Ivory Coast' },
  { label: 'Cameroon', value: 'Cameroon' },
  { label: 'Democratic Republic of the Congo', value: 'Democratic Republic of the Congo' },
  { label: 'Republic of the Congo', value: 'Republic of the Congo' },
  { label: 'Colombia', value: 'Colombia' },
  { label: 'Costa Rica', value: 'Costa Rica' },
  { label: 'Cuba', value: 'Cuba' },
  { label: 'Northern Cyprus', value: 'Northern Cyprus' },
  { label: 'Cyprus', value: 'Cyprus' },
  { label: 'Czech Republic', value: 'Czech Republic' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Djibouti', value: 'Djibouti' },
  { label: 'Denmark', value: 'Denmark' },
  { label: 'Dominican Republic', value: 'Dominican Republic' },
  { label: 'Algeria', value: 'Algeria' },
  { label: 'Ecuador', value: 'Ecuador' },
  { label: 'Egypt', value: 'Egypt' },
  { label: 'Eritrea', value: 'Eritrea' },
  { label: 'Spain', value: 'Spain' },
  { label: 'Estonia', value: 'Estonia' },
  { label: 'Ethiopia', value: 'Ethiopia' },
  { label: 'Finland', value: 'Finland' },
  { label: 'Fiji', value: 'Fiji' },
  { label: 'Falkland Islands', value: 'Falkland Islands' },
  { label: 'France', value: 'France' },
  { label: 'Gabon', value: 'Gabon' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Ghana', value: 'Ghana' },
  { label: 'Guinea', value: 'Guinea' },
  { label: 'Gambia', value: 'Gambia' },
  { label: 'Guinea Bissau', value: 'Guinea Bissau' },
  { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
  { label: 'Greece', value: 'Greece' },
  { label: 'Greenland', value: 'Greenland' },
  { label: 'Guatemala', value: 'Guatemala' },
  { label: 'French Guiana', value: 'French Guiana' },
  { label: 'Guyana', value: 'Guyana' },
  { label: 'Honduras', value: 'Honduras' },
  { label: 'Croatia', value: 'Croatia' },
  { label: 'Haiti', value: 'Haiti' },
  { label: 'Hungary', value: 'Hungary' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'India', value: 'India' },
  { label: 'Ireland', value: 'Ireland' },
  { label: 'Iran', value: 'Iran' },
  { label: 'Iraq', value: 'Iraq' },
  { label: 'Iceland', value: 'Iceland' },
  { label: 'Israel', value: 'Israel' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Jamaica', value: 'Jamaica' },
  { label: 'Jordan', value: 'Jordan' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Kazakhstan', value: 'Kazakhstan' },
  { label: 'Kenya', value: 'Kenya' },
  { label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
  { label: 'Cambodia', value: 'Cambodia' },
  { label: 'South Korea', value: 'South Korea' },
  { label: 'Kosovo', value: 'Kosovo' },
  { label: 'Kuwait', value: 'Kuwait' },
  { label: 'Laos', value: 'Laos' },
  { label: 'Lebanon', value: 'Lebanon' },
  { label: 'Liberia', value: 'Liberia' },
  { label: 'Libya', value: 'Libya' },
  { label: 'Sri Lanka', value: 'Sri Lanka' },
  { label: 'Lesotho', value: 'Lesotho' },
  { label: 'Lithuania', value: 'Lithuania' },
  { label: 'Luxembourg', value: 'Luxembourg' },
  { label: 'Latvia', value: 'Latvia' },
  { label: 'Morocco', value: 'Morocco' },
  { label: 'Moldova', value: 'Moldova' },
  { label: 'Madagascar', value: 'Madagascar' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Macedonia', value: 'Macedonia' },
  { label: 'Mali', value: 'Mali' },
  { label: 'Myanmar', value: 'Myanmar' },
  { label: 'Montenegro', value: 'Montenegro' },
  { label: 'Mongolia', value: 'Mongolia' },
  { label: 'Mozambique', value: 'Mozambique' },
  { label: 'Mauritania', value: 'Mauritania' },
  { label: 'Malawi', value: 'Malawi' },
  { label: 'Malaysia', value: 'Malaysia' },
  { label: 'Namibia', value: 'Namibia' },
  { label: 'New Caledonia', value: 'New Caledonia' },
  { label: 'Niger', value: 'Niger' },
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'Nicaragua', value: 'Nicaragua' },
  { label: 'Netherlands', value: 'Netherlands' },
  { label: 'Norway', value: 'Norway' },
  { label: 'Nepal', value: 'Nepal' },
  { label: 'New Zealand', value: 'New Zealand' },
  { label: 'Oman', value: 'Oman' },
  { label: 'Pakistan', value: 'Pakistan' },
  { label: 'Panama', value: 'Panama' },
  { label: 'Peru', value: 'Peru' },
  { label: 'Philippines', value: 'Philippines' },
  { label: 'Papua New Guinea', value: 'Papua New Guinea' },
  { label: 'Poland', value: 'Poland' },
  { label: 'Puerto Rico', value: 'Puerto Rico' },
  { label: 'North Korea', value: 'North Korea' },
  { label: 'Portugal', value: 'Portugal' },
  { label: 'Paraguay', value: 'Paraguay' },
  { label: 'Qatar', value: 'Qatar' },
  { label: 'Romania', value: 'Romania' },
  { label: 'Russia', value: 'Russia' },
  { label: 'Rwanda', value: 'Rwanda' },
  { label: 'Western Sahara', value: 'Western Sahara' },
  { label: 'Saudi Arabia', value: 'Saudi Arabia' },
  { label: 'Sudan', value: 'Sudan' },
  { label: 'South Sudan', value: 'South Sudan' },
  { label: 'Senegal', value: 'Senegal' },
  { label: 'Solomon Islands', value: 'Solomon Islands' },
  { label: 'Sierra Leone', value: 'Sierra Leone' },
  { label: 'El Salvador', value: 'El Salvador' },
  { label: 'Somaliland', value: 'Somaliland' },
  { label: 'Somalia', value: 'Somalia' },
  { label: 'Republic of Serbia', value: 'Republic of Serbia' },
  { label: 'Surilabel', value: 'Surilabel' },
  { label: 'Slovakia', value: 'Slovakia' },
  { label: 'Slovenia', value: 'Slovenia' },
  { label: 'Sweden', value: 'Sweden' },
  { label: 'Swaziland', value: 'Swaziland' },
  { label: 'Syria', value: 'Syria' },
  { label: 'Chad', value: 'Chad' },
  { label: 'Togo', value: 'Togo' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Tajikistan', value: 'Tajikistan' },
  { label: 'Turkmenistan', value: 'Turkmenistan' },
  { label: 'East Timor', value: 'East Timor' },
  { label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
  { label: 'Tunisia', value: 'Tunisia' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'United Republic of Tanzania', value: 'United Republic of Tanzania' },
  { label: 'Uganda', value: 'Uganda' },
  { label: 'Ukraine', value: 'Ukraine' },
  { label: 'Uruguay', value: 'Uruguay' },
  { label: 'United States', value: 'United States' },
  { label: 'Uzbekistan', value: 'Uzbekistan' },
  { label: 'Venezuela', value: 'Venezuela' },
  { label: 'Vietnam', value: 'Vietnam' },
  { label: 'Vanuatu', value: 'Vanuatu' },
  { label: 'West Bank', value: 'West Bank' },
  { label: 'Yemen', value: 'Yemen' },
  { label: 'South Africa', value: 'South Africa' },
  { label: 'Zambia', value: 'Zambia' },
  { label: 'Zimbabwe', value: 'Zimbabwe' }
]

module.exports = options
