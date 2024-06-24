def count_valid_range_sums(nums, lower, upper):
    def sort_and_count(prefix, start, end):
        if end - start <= 1:
            return 0
        
        mid = (start + end) // 2
        count = sort_and_count(prefix, start, mid) + sort_and_count(prefix, mid, end)
        
        j = k = t = mid
        temp = []
        
        for i in range(start, mid):
            while k < end and prefix[k] - prefix[i] < lower:
                k += 1
            while j < end and prefix[j] - prefix[i] <= upper:
                j += 1
            while t < end and prefix[t] < prefix[i]:
                temp.append(prefix[t])
                t += 1
            temp.append(prefix[i])
            count += j - k
        
        while t < end:
            temp.append(prefix[t])
            t += 1
        
        prefix[start:start+len(temp)] = temp
        return count
    
    prefix_sums = [0]
    for num in nums:
        prefix_sums.append(prefix_sums[-1] + num)
    
    return sort_and_count(prefix_sums, 0, len(prefix_sums))

# Example test case
nums = [-2, 5, -1]
lower = -2
upper = 2
print(count_valid_range_sums(nums, lower, upper))  # Output: 3
