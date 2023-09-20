import React, { useState, useEffect } from 'react';
import "./password.css";
import copy from "copy-to-clipboard";

// get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("generatedPassword");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};


const Password = () => {

    // State variables
    const [copyText, setCopyText] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordHistory, setPasswordHistory] = useState(getLocalData());
    const [preferences, setPreferences] = useState({
        includeNumbers: true,
        includeAlphabets: true,
        includeSpecialChars: true,
    });




    // Function to generate a random password
    const generatePassword = () => {
        setCopyText(false)
        // Define character sets
        const numbers = '0123456789';
        const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        // Build the character set based on user preferences
        let charset = '';
        if (preferences.includeNumbers) charset += numbers;
        if (preferences.includeAlphabets) charset += alphabets;
        if (preferences.includeSpecialChars) charset += specialChars;

        // Generate the password
        let newPassword = '';
        const passwordLength = 12; // Adjust the desired password length
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            newPassword += charset.charAt(randomIndex);
        }

        // Update the password state and history
        setPassword(newPassword);
        setPasswordHistory([...passwordHistory, newPassword]);
    };

    // Function to copy password to clipboard
    const copyToClipboard = () => {
        if (!password) return;
        copy(password)
        setCopyText(true)

    };
    // adding localStorage
    useEffect(() => {
        localStorage.setItem("generatedPassword", JSON.stringify(passwordHistory));
    }, [passwordHistory]);
    return (
        <>
            <div className='main_container'>


                <div className='container'>
                    <h1 style={{ marginBottom: "1rem" }}>Random Password Generator</h1>

                    <div className='pass_wrapper'>

                        <div className="preferences">
                            <label>
                                Include Numbers
                                <input
                                    type="checkbox"
                                    checked={preferences.includeNumbers}
                                    onChange={() =>
                                        setPreferences({
                                            ...preferences,
                                            includeNumbers: !preferences.includeNumbers,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                Include Alphabets
                                <input
                                    type="checkbox"
                                    checked={preferences.includeAlphabets}
                                    onChange={() =>
                                        setPreferences({
                                            ...preferences,
                                            includeAlphabets: !preferences.includeAlphabets,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                Include Special Characters
                                <input
                                    type="checkbox"
                                    checked={preferences.includeSpecialChars}
                                    onChange={() =>
                                        setPreferences({
                                            ...preferences,
                                            includeSpecialChars: !preferences.includeSpecialChars,
                                        })
                                    }
                                />
                            </label>
                        </div>

                        <div className='gen_password'>
                            <strong id='pass' style={{ backgroundColor: copyText ? "blue" : "" }}> {password}</strong>

                        </div>

                        <div className='password_btn'>
                            <button onClick={generatePassword}> generate</button>
                            <button onClick={copyToClipboard}> copy</button>
                        </div>

                    </div>

                </div>

                <div className='password_history'>
                    <h1 style={{ marginBottom: "2rem" }}>Last Five Passwords</h1>
                    <ul>
                        {passwordHistory.slice(-5).map((historyItem, index) => (
                            <li key={index}><strong>{historyItem} </strong></li>
                        ))}
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Password