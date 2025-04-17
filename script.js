document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const confirmation = document.getElementById('confirmation');
    const skillSelect = document.getElementById('skill');
    const otherSkillGroup = document.getElementById('other-skill-group');

    // Modal functionality
    const termsLinks = document.querySelectorAll('.terms-link');
    const termsModal = document.getElementById('termsModal');
    const policyModal = document.getElementById('policyModal');
    const closeButtons = document.querySelectorAll('.close');

    termsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent.includes('Terms')) {
                termsModal.classList.add('active');
            } else {
                policyModal.classList.add('active');
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            termsModal.classList.remove('active');
            policyModal.classList.remove('active');
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target === termsModal) {
            termsModal.classList.remove('active');
        }
        if (e.target === policyModal) {
            policyModal.classList.remove('active');
        }
    });

    // Show/hide other skill field based on selection
    skillSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherSkillGroup.style.display = 'block';
        } else {
            otherSkillGroup.style.display = 'none';
            document.getElementById('other-skill-error').style.display = 'none';
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error messages
        clearErrors();
        
        // Validate form
        if (validateForm()) {
            // Form is valid, show confirmation
            form.classList.add('hidden');
            confirmation.classList.remove('hidden');
            
            // Get the final skill value
            const skillValue = skillSelect.value === 'other' 
                ? document.getElementById('other-skill').value.trim()
                : skillSelect.options[skillSelect.selectedIndex].text;
            
            // In a real application, you would submit the form data to a server here
            console.log('Form submitted successfully!');
            console.log({
                name: form.name.value,
                email: form.email.value,
                skill: skillValue,
                portfolio: form.portfolio.value,
                terms: form.terms.checked
            });
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validate Name
        const name = form.name.value.trim();
        if (name === '') {
            showError('name-error', 'Please enter your full name');
            isValid = false;
        } else if (name.length < 3) {
            showError('name-error', 'Name must be at least 3 characters');
            isValid = false;
        }
        
        // Validate Email
        const email = form.email.value.trim();
        if (email === '') {
            showError('email-error', 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Skill
        const skill = form.skill.value;
        if (skill === '') {
            showError('skill-error', 'Please select your skill category');
            isValid = false;
        } else if (skill === 'other') {
            const otherSkill = document.getElementById('other-skill').value.trim();
            if (otherSkill === '') {
                showError('other-skill-error', 'Please specify your skill');
                isValid = false;
            } else if (otherSkill.length < 3) {
                showError('other-skill-error', 'Skill must be at least 3 characters');
                isValid = false;
            }
        }
        
        // Validate Portfolio URL (optional but must be valid if provided)
        const portfolio = form.portfolio.value.trim();
        if (portfolio !== '' && !isValidUrl(portfolio)) {
            showError('portfolio-error', 'Please enter a valid URL (include http:// or https://)');
            isValid = false;
        }
        
        // Validate Terms
        if (!form.terms.checked) {
            showError('terms-error', 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Make resetForm available globally
    window.resetForm = function() {
        form.reset();
        clearErrors();
        otherSkillGroup.style.display = 'none';
        confirmation.classList.add('hidden');
        form.classList.remove('hidden');
    };
});