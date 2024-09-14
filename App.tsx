import { useState } from 'react'
// import './global.css';
// import { GluestackUIProvider } from "@/'components/ui'/gluestack-ui-provider";
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';
import { StyleSheet, Text, View, } from 'react-native'
import { number, object, } from 'yup'
import { Input, InputField, InputSlot, InputIcon } from './components/ui/input';
import { Radio, RadioIcon } from './components/ui/radio';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Button, ButtonText } from './components/ui/button';
let passwordSchema = object({
  passwordLength: number()
    .min(4, 'should be min of 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('length is required')
})
export default function App() {
  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [passwordLength, setPasswordLength] = useState('')
  const generatePasswordString = (passwordLength: number) => {
    let generatedString = ''

    const uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const lowercase_letters = "abcdefghijklmnopqrstuvwxyz"

    const Numbers = "0123456789"

    const special_characters = "!@#$%^&*"

    if (upperCase) {
      generatedString += uppercase_letters
    }
    if (lowercase) {
      generatedString += lowercase_letters
    }
    if (numbers) {
      generatedString += Numbers
    }
    if (symbols) {
      generatedString += special_characters
    }

    const passwordResult = createPassword(generatedString, passwordLength)
    console.log(passwordResult);
    
    setPassword(passwordResult)
    setIsPasswordGenerated(true)
  }
  const createPassword = (characters: string, passwordLength: number) => {
    let generatedPassword = ''

    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length)
      generatedPassword += characters.charAt(charIndex)
    }
    return generatedPassword
  }
  const resetPasswordstate = () => {
    setUpperCase(false)
    setLowercase(true)
    setPassword('')
    setIsPasswordGenerated(false)
    setNumbers(false)
    setSymbols(false)
    setPasswordLength('')
  }
  return (
    <GluestackUIProvider mode="light" style={styles.mainContainer} >

      <View style={styles.container1}>
        <Text style={styles.labelText}>Password Length:</Text>
        <Input
          style={styles.inputLength}
          variant='rounded'
          size="sm"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            onChangeText={(text) => {
              setPasswordLength(text)
            }}
            value={passwordLength}
            placeholder='Enter length'

          />
        </Input>
        {/* <View style={styles.inputWrapper}>
            
        </View> */}

      </View>
      <View style={styles.container2}>
        <Text style={styles.radioLabelText}>Include LowerCase</Text>
        <BouncyCheckbox
          isChecked={lowercase}
          onPress={() => {
            setLowercase(!lowercase)
          }}
          fillColor='#29AB87'
        />
      </View>
      <View style={styles.container2}>
        <Text style={styles.radioLabelText}>Include UpperCase</Text>
        <BouncyCheckbox
          style={styles.CheckBox2}
          isChecked={upperCase}
          onPress={() => {
            setUpperCase(!upperCase)
          }}
          fillColor='#29AB87'
        />
      </View>
      <View style={styles.container2}>
        <Text style={styles.radioLabelText}>Include Numbers</Text>
        <BouncyCheckbox
          style={styles.CheckBox3}
          isChecked={numbers}
          onPress={() => {
            setNumbers(!numbers)
          }}
          fillColor='#29AB87'
        />
      </View>
      <View style={styles.container2}>
        <Text style={styles.radioLabelText}>Include Symbols</Text>
        <BouncyCheckbox
          style={styles.CheckBox4}
          isChecked={symbols}
          onPress={() => {
            setSymbols(!symbols)
          }}
          fillColor='#29AB87'
        />
      </View>
      <View style={styles.container3}>
        <Button
          onPress={() => {
            generatePasswordString(Number(passwordLength))
          }}
          style={styles.Button1} size="md" variant="solid" action="primary">
          <ButtonText>Generate Password</ButtonText>
        </Button>
        <Button
          onPress={() => {
            resetPasswordstate()
          }}
          style={styles.Button2} size="md" variant="solid" action="primary">
          <ButtonText>Reset</ButtonText>
        </Button>
      </View>
      <View style={styles.container4}>
        <Text selectable style={styles.finalPassword}>{password}</Text>
      </View>

    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
     backgroundColor:'white'
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    backgroundColor: 'purple',
    padding: 20
  },
  labelText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  inputLength: {
    backgroundColor: 'white',
    width: 150
  },

  container2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    backgroundColor: 'white',
    padding: 10
  },

  radioLabelText: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600'
  },

  CheckBox2: {
    marginLeft: 5
  },
  CheckBox3: {
    marginLeft: 20
  },
  CheckBox4: {
    marginLeft: 25
  },

  container3: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  Button1: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,

  },

  Button2: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,

  },
  container4:{
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red',
    marginVertical:20,
    padding:10,
  },
  finalPassword:{
    fontSize:20,
    fontWeight:'bold',
    color:'black '
  }
})

