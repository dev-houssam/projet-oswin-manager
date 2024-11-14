#!/bin/bash

# Taille de la RAM en bytes (1 Ko = 1024 bytes)
RAM_SIZE=1024
RAM_FILE="/tmp/vm_ram.txt"

# Initialisation de la RAM (si elle n'existe pas)
initialize_ram() {
    if [[ ! -f "$RAM_FILE" ]]; then
        # Remplir la RAM avec des zéros
        yes 0 | head -n "$RAM_SIZE" > "$RAM_FILE"
    fi
}

# Fonction pour lire une valeur dans la RAM (adresse donnée en argument)
read_memory() {
    local address=$1
    local value
    # Lire la valeur à l'adresse spécifique de la RAM
    value=$(sed -n "${address}p" "$RAM_FILE")
    echo "$value"
}

# Fonction pour écrire une valeur dans la RAM à une adresse spécifique
write_memory() {
    local address=$1
    local value=$2
    # Mettre à jour la valeur à l'adresse spécifiée dans le fichier de la RAM
    sed -i "${address}s/.*/$value/" "$RAM_FILE"
}

# Fonction pour afficher tout le contenu de la RAM (pour débogage)
print_ram() {
    cat "$RAM_FILE"
}

# Fonction pour exécuter des instructions avec la RAM non-volatile
execute_instruction() {
    local instruction="$1"
    local operand1="$2"
    local operand2="$3"

    case "$instruction" in
        MOV)
            if [[ "$operand1" =~ R[12] ]]; then
                declare -g "$operand1=$operand2"
            else
                write_memory "$operand1" "$operand2"
            fi
            ;;
        ADD)
            if [[ "$operand1" =~ R[12] ]]; then
                declare -g "$operand1=$((${!operand1} + operand2))"
            else
                local current_value
                current_value=$(read_memory "$operand1")
                write_memory "$operand1" $((current_value + operand2))
            fi
            ;;
        SUB)
            if [[ "$operand1" =~ R[12] ]]; then
                declare -g "$operand1=$((${!operand1} - operand2))"
            else
                local current_value
                current_value=$(read_memory "$operand1")
                write_memory "$operand1" $((current_value - operand2))
            fi
            ;;
        PRINT)
            if [[ "$operand1" =~ R[12] ]]; then
                echo "$operand1 = ${!operand1}"
            else
                local value
                value=$(read_memory "$operand1")
                echo "$operand1 = $value"
            fi
            ;;
        *)
            echo "Erreur : instruction inconnue $instruction"
            ;;
    esac
}

# Fonction principale pour exécuter un "programme" en assembleur
run_program() {
    local program=("$@")
    
    for line in "${program[@]}"; do
        # Découpe l'instruction et ses opérandes
        read -r instruction operand1 operand2 <<< "$line"
        execute_instruction "$instruction" "$operand1" "$operand2"
    done
}

# Initialisation de la RAM (charge la mémoire persistante si elle existe)
initialize_ram

# Programme d'assembleur simulé avec la RAM persistante
program=(
    "MOV 10 100"         # RAM[10] = 100
    "MOV 20 50"          # RAM[20] = 50
    "ADD 10 25"          # RAM[10] = RAM[10] + 25
    "SUB 20 5"           # RAM[20] = RAM[20] - 5
    "PRINT 10"           # Affiche la valeur de RAM[10]
    "PRINT 20"           # Affiche la valeur de RAM[20]
)

# Exécuter le programme
run_program "${program[@]}"

# Optionnel : Afficher tout le contenu de la RAM (débogage)
print_ram

