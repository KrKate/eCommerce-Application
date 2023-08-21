import { defineStore } from 'pinia'
import axios from 'axios'
import type { Customer, PasswordFlowResponse, TokenResponse} from "@/stores/types";

export const userRegistration = defineStore('customer', {
    state: () => ({
       email: '',
       password: '',
       firstName: '',
       lastName: '',
       middleName: '',
       title: '',
       salutation: '',
       dateOfBirh: Date,
       companyName: '',
       vatId: '',
       addresses: [],
       defaultShippingAddress: 0,
       defaultBillingAddress: 1,
       locale: '',
       stores: [],
       token: ''
    }),
    actions: {
        async clientСredentialsFlow() {
           try {
            const data: TokenResponse = await axios
            .post(
                `https://auth.europe-west1.gcp.commercetools.com/oauth/token/
                ${this.firstName+''+this.lastName}:${this.password}/
                grant_type=client_credentials&scope=manage_project:ecommerce_app_sloths`,
                {},
                {
                headers: {
                    Authorization: `Basic ${btoa('QWxhZGRpbjpvcGVuIHNlc2FtZQ==')}`,
                }
             }
            ).then((data) => data.data)
           } catch (error) {
            console.log(error)
           }
        },
        async passwordFlow() {
            try {
                const data: PasswordFlowResponse = await axios
                .post(
                    `https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_typegrant_type=password&username=${this.email}&password=${this.password}`,
                    {},
                    {
                        headers: {
                            Authorization: `Basic: ${btoa(
                                'QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
                            )}`
                        }
                    }
   
                ).then((data) => data.data)

            } catch (error) {
                console.log(error)
            }
        },
        async registration(email:string, firstName: string, lastName: string, password: string) {
            try {
                const customerData: Customer = await axios
                .post (
                    'https://api.europe-west1.gcp.commercetools.com/ecommerce_app_sloths/me/signup',
                     JSON.stringify({
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: password
                     }),
                     {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                     }
                 )
                 .then((data) => data.data)
                 this.email = customerData.customer.email
                 this.firstName = customerData.customer.firstName
                 this.lastName = customerData.customer.lastName
                 this.password = customerData.customer.password
                 return true
            } catch (erroe) {
                return false
            }
        }
    }
})
