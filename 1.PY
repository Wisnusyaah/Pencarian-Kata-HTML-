import time

def brute_force_search(text, pattern):
    """
    Brute force search algorithm to find all occurrences of a pattern in a text.
    """
    occurrences = []
    n = len(text)
    m = len(pattern)
    for i in range(n - m + 1):
        match = True
        for j in range(m):
            if text[i + j] != pattern[j]:
                match = False
                break
        if match:
            occurrences.append(i)
    return occurrences

def greedy_search(text, pattern):
    """
    Greedy search algorithm to find all occurrences of a pattern in a text.
    """
    occurrences = []
    n = len(text)
    m = len(pattern)
    i = 0
    while i <= n - m:
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1
        if j == m:
            occurrences.append(i)
            i += m
        elif j == 0:
            i += 1
        else:
            i += j
    return occurrences

def main():
    text = input("Enter text: ")
    pattern = input("Enter pattern to search: ")

    start_time = time.time()
    brute_force_occurrences = brute_force_search(text, pattern)
    brute_force_time = time.time() - start_time

    start_time = time.time()
    greedy_occurrences = greedy_search(text, pattern)
    greedy_time = time.time() - start_time

    print(f"Brute force occurrences: {brute_force_occurrences}")
    print(f"Brute force search time: {brute_force_time} seconds")
    print(f"Greedy occurrences: {greedy_occurrences}")
    print(f"Greedy search time: {greedy_time} seconds")

if __name__ == "_main_":
    main()